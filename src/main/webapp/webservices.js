function charger_crayons() {
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
		/* Permet de verifier que je viens de recevoir la reponse du serveur */
		if (this.readyState == 4) {
			/* Permet de verifier que le traitement s'est bien passe */
			if (this.status == 200) {
				afficher_crayon(request.responseText);
			} else {
				document.getElementById('liste_crayons').innerHTML = "Echec de la recuperation des donnees";
				/* document.getElementById('liste_crayons').innerHTML += request.responseText; */
			}
		}
	};
	
	request.open("GET", "http://localhost:8080/DemoWebservices/rest/crayons", true);
	request.send();
}

function ajouter_crayon() {
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				afficher_message(request.responseText, "ajouté");
				charger_crayons();
			}
		}
	}
	
	var data = "type=Plume&couleur=Rouge";
	request.open("POST", "http://localhost:8080/DemoWebservices/rest/crayons", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(data);
}

function modifier_crayon() {
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				afficher_message(request.responseText, "modifié");
				charger_crayons();
			}
		}
	}
	
	var idStylo = document.getElementById('stylo_id').value;
	var typeStylo = document.getElementById('stylo_type').value;
	var couleurStylo = document.getElementById('stylo_couleur').value;
	
	var data = "type=" + typeStylo + "&couleur="+couleurStylo;
	request.open("PUT", "http://localhost:8080/DemoWebservices/rest/crayons/" + idStylo, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(data);
}

function supprimer_crayon() {
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				afficher_message(request.responseText, "supprimé");
				charger_crayons();
			}
		}
	}
	
	request.open("DELETE", "http://localhost:8080/DemoWebservices/rest/crayons/3", true);
	request.send();
}

function afficher_crayon(reponse) {
	var contenuJSON = JSON.parse(reponse);
	var ul_liste_crayon = document.getElementById('liste_crayons');
	var template = document.getElementById('ligne_crayon');
	
	ul_liste_crayon.innerHTML = "";
	for (i = 0; i < contenuJSON.length; i++) {
		var clone = document.importNode(template.content, true);
		var li = clone.querySelector('li');
		li.textContent = contenuJSON[i].id + ' ' + contenuJSON[i].type + ' ' + contenuJSON[i].couleur;
		ul_liste_crayon.appendChild(clone);
	}
}

function afficher_message(reponse, action) {
	var contenuJSON = JSON.parse(reponse);
	var pMessage = document.getElementById('message_holder');
	var contenu = "Le stylo [" + contenuJSON.type + " " + contenuJSON.couleur + "] a bien été "+ action +".";
	pMessage.innerHTML = contenu;
}













