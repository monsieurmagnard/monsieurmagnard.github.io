var marche = false; // 160620
var instantDuDepart; // 160624
var premierTemps = false;
var metronome = false; // 161104: création
var permAlert = true; // 170106: pour Message provisoire

//var tableauDeSelectionsPEv = new Array(); // 160630
//var tableauDeSelectionsEvP = new Array(); // 160724 Platys Giallo
var tableauDeSelectionGeneralEvP = new Array(); // 160807 Lescherolles
var tableauDeSelectionGeneralPEv = new Array(); // 160812 Lescherolles
var nouvelleSelection; // 160708: booléen, indiquant un événement click sur une cellule du canvas.
var tableauDEvenements = new Array(); // 160708: création.
var tableauDEvenementsPairs = new Array(); // 160909: création.
var tableauDEvenementsImpairs = new Array(); // 160909: création.
var tableauDePistesPEvenement = new Array(); // 160709: création.
var tableauDePistesPEvenementsPairs = new Array(); // 160912: création.
var tableauDePistesPEvenementsImpairs = new Array(); // 160912: création.
var tableauDeMomentsDsEv = new Array(); // 160829: création.
var tableauDeMomentsDsEvPairs = new Array(); // 160914, d'après 160829: création.
var tableauDeMomentsDsEvImpairs = new Array(); // 160914, d'après 160829: création.
var prochainIndiceEv = 0; // 160901, placement ici
var prochainIndiceEvPair = 0; // 160914
var prochainIndiceEvImpair = 0; // 160914

//var tableauDeVues = new Array(); // 160705
var nbreDivDsSequence = 64; // 160807, 64 pour le moment (4*16)
var ancienNbreDivDsSequence = 64; // 161014
//var nbreVues; // 160807
var dejaJoueTemps; // 160903 déplacement ici
dejaJoueTemps = false;
var dejaJoueSonsPairs; // 160904, modif 160908
dejaJoueSonsPairs = false;
var dejaJoueSonsImpairs; // 160908
dejaJoueSonsImpairs = false;

var s = document.getElementById("sorties");
s.style.display = "none"; // 180218: "none" (invisible) opposé à "block" 

//var noDeVue; // 160807
// document.getElementById("horiz").value = 15; // 160823: test fonctionne en écriture: réponse oui
function recupNbreMesDsSequence(){ // 161011, 161102: déplacé ici
	var nombreMesuresDsSequence;
	nombreMesuresDsSequence = document.getElementById("champNMesSeq").value; // 161103
	return nombreMesuresDsSequence;
}

function recupNbreDivPTemps(){ // 161011, 161102: déplacé ici
	var nombreDivParTemps
	nombreDivParTemps = document.getElementById("champNDivPTps").value; // 161011
	return nombreDivParTemps;
}

function recupNbreTempsPMesure(){ // 161019, 161102: déplacé ici
	var nombreTempsPMesure
	nombreTempsPMesure = document.getElementById("champNTpsPMes").value; // 161019
	return nombreTempsPMesure;
}

function calculerNbreDivDsSequence(){ // 161014
	var nbreDivDsSequence, nbreMesuresDsSequence, nbreTempsPMesure, nbreDivPTemps;
	nbreMesuresDsSequence = recupNbreMesDsSequence();
	nbreDivPTemps = recupNbreDivPTemps();
	nbreTempsPMesure = recupNbreTempsPMesure();
	nbreDivDsSequence = nbreMesuresDsSequence * nbreTempsPMesure * nbreDivPTemps;
	return nbreDivDsSequence;
}

//calculerNbreDivDsSequence(); // 161017: calcul initial
function calculerNbreVuesDsSequence(){ // 1610..
	var nbreDivDsSequence, nbreVuesDsSequence;
	nbreDivDsSequence = calculerNbreDivDsSequence();
	nbreVuesDsSequence = Math.floor(nbreDivDsSequence/16) + (nbreDivDsSequence % 16 > 4) + (nbreDivDsSequence <= 4); // 161105, révision de la formule d'après 161020, test fiddle OK
	return nbreVuesDsSequence;
}

function recupPositionDerouleurHoriz(){ // 160808 Lescherolles (faux acouphène, agonie de la montre)
	var positDeroulHorizontal, noDeVueBrut, noDeVue, noCellCorr, nbreDivDsSequence, nbreVuesDsSequence; // 161012: ajout
	nbreDivDsSequence = calculerNbreDivDsSequence();
	nbreVuesDsSequence = calculerNbreVuesDsSequence();
	positDeroulHorizontal = document.getElementById("horiz").value;
	noCellCorr = Math.floor((positDeroulHorizontal*nbreDivDsSequence)/1000); // 161012
	noDeVueBrut = Math.floor(noCellCorr / 16); // 160810: Lesch.: à nouveau panne d'eau, résolu comment? // 161012: rempl./noCellCorr
	//noDeVue = noDeVueBrut - ((noDeVueBrut > 0)*(noCellCorr%16 < 4)); // 160811
	noDeVue = (noDeVueBrut * (noDeVueBrut < nbreVuesDsSequence)) + ((nbreVuesDsSequence - 1) * (noDeVueBrut == nbreVuesDsSequence)); // 161107
	// document.getElementById("demo_15").innerHTML = "NoVue: " + noDeVue; // 161107: retour à noDeVue mais sur une base mieux réfléchie
	return noDeVue; // 160809: Test demo_15, posDerHoriz OK// 160811: noDeVue OK
}

function recupMesInsertBoucle(){ // 170115
	var noMesInsertBoucle;
	noMesInsertBoucle = document.getElementById("champDepartBoucle").value; // 170115
	return noMesInsertBoucle;
}

function recupNbreMesDsBoucle(){ // 170215
	var nbreMesDsBoucle;
	nbreMesDsBoucle = document.getElementById("champNMesBoucle").value; // 170215
	return nbreMesDsBoucle;
}

function recupNbreBoucles(){ // 170206
	var nombreBoucles;
	nombreBoucles = document.getElementById("champNBoucles").value; // 170206
	return nombreBoucles;
}

function creertableauDeSelectionGeneralEvP(){ // 160807
	var nbreDivDsSequence;
	nbreDivDsSequence = calculerNbreDivDsSequence();
	for (var i = 0; i < nbreDivDsSequence; i++){
		tableauDeSelectionGeneralEvP[i] = new Array();
		for (var j = 0; j < 3; j++){
			tableauDeSelectionGeneralEvP[i][j] = false;
		} // for j pistes
	 } // for i div
} // F // 160811: Eventmt: créer un tableau de sélection général par pistes pour dessin des différentes vues

function creertableauDeSelectionGeneralPEv(){ // 160812: pour sections du panneau de sélection.
	var nbreDivDsSequence/*, nbreDivPTemps*/;
	nbreDivDsSequence = calculerNbreDivDsSequence();// * 4 * nbreDivPTemps;
	for (var i = 0; i < 3; i++){
		tableauDeSelectionGeneralPEv[i] = new Array();
		
		for (var j = 0; j < nbreDivDsSequence; j++){
			tableauDeSelectionGeneralPEv[i][j] = false;
		} // for j événements
	 } // for i pistes
}

creertableauDeSelectionGeneralEvP(); // 160807: Lescherolles
creertableauDeSelectionGeneralPEv(); // 160812:

function remettreAZeroTableauxDEvenements(){ // 161102
	tableauDEvenements.splice(0, tableauDEvenements.length); // 160721: remise à 0
	tableauDEvenementsPairs.splice(0, tableauDEvenementsPairs.length); // 160909
	tableauDEvenementsImpairs.splice(0, tableauDEvenementsImpairs.length); // 160909
	tableauDePistesPEvenement.splice(0, tableauDePistesPEvenement.length); // 160723
	tableauDePistesPEvenementsPairs.splice(0, tableauDePistesPEvenementsPairs.length); // 160912, d'après 160723
	tableauDePistesPEvenementsImpairs.splice(0, tableauDePistesPEvenementsImpairs.length); // 160912, d'après 160723
	tableauDeMomentsDsEv.splice(0, tableauDeMomentsDsEv.length); // 160829
	tableauDeMomentsDsEvPairs.splice(0, tableauDeMomentsDsEvPairs.length); // 160914
	tableauDeMomentsDsEvImpairs.splice(0, tableauDeMomentsDsEvImpairs.length); // 160914, test OK	
}

function reagir(){ // 161018
	// var nbreDivDsSequence;
	// nbreDivDsSequence = calculerNbreDivDsSequence();
	tableauDeSelectionGeneralEvP.splice(0, tableauDeSelectionGeneralEvP.length); // 161101
	tableauDeSelectionGeneralPEv.splice(0, tableauDeSelectionGeneralPEv.length); // 161101
	remettreAZeroTableauxDEvenements(); // 161102	
	creertableauDeSelectionGeneralEvP(); 
	creertableauDeSelectionGeneralPEv();
	//document.getElementById("demo_5").innerHTML = recupMesInsertBoucle(); // Test 170115
}

function deSeqABoucle(){ // 170404 renommé interagir() de 170327
	var mesureInsertionBoucle, nbreMesDsBoucle, nbreMesDsSequence;
	mesureInsertionBoucle = parseInt(recupMesInsertBoucle());
	nbreMesDsBoucle = parseInt(recupNbreMesDsBoucle());
	//document.getElementById("demo_5").innerHTML = "mesureInsertionBoucle: " + mesureInsertionBoucle; // Test 170327: OK
	//document.getElementById("demo_6").innerHTML = "nbreMesDsBoucle: " + nbreMesDsBoucle; // Test 170327: OK
	//document.getElementById("demo_7").innerHTML = "nbreMesAFinBoucle: " + nbreMesAFinBoucle; // Test 170327: OK
	nbreMesDsSequence = parseInt(recupNbreMesDsSequence());
	//document.getElementById("demo_5").innerHTML = "nbreMesDsSequence: " + nbreMesDsSequence; // Test 170327: OK
	if (nbreMesDsSequence < nbreMesDsBoucle + (mesureInsertionBoucle - 1)){ // 170403 d'après étude théorique 170401
		nbreMesDsBoucle = nbreMesDsSequence - (mesureInsertionBoucle - 1);
		if (nbreMesDsBoucle < 1){
			nbreMesDsBoucle = 1;
			mesureInsertionBoucle = nbreMesDsSequence;
		}
	}
	//document.getElementById("demo_6").innerHTML = "nbreMesDsBoucle: " + nbreMesDsBoucle; // Test 170403: OK
	//document.getElementById("demo_7").innerHTML = "mesureInsertionBoucle: " + mesureInsertionBoucle; // Test 170403: OK
	document.getElementById("champNMesBoucle").value = nbreMesDsBoucle; // 170403
	document.getElementById("champDepartBoucle").value = mesureInsertionBoucle; // 170403
}

function dePosBoucleASequence(){ // 170404 renommé de 170115 signalerPosBoucle()
	//document.getElementById("demo_5").innerHTML = "Boucle à: " + recupMesInsertBoucle(); // Test 170115: OK
}

function deBoucleASequence(){ // 170404 renommé de 170115 signalerNbreMesuresDsBoucle()
	var nbreMesDsBoucle, nbreMesDsSequence, mesureInsertionBoucle;
	nbreMesDsBoucle = parseInt(recupNbreMesDsBoucle());
	document.getElementById("demo_5").innerHTML = "NbreMesuresDsBoucle: " + nbreMesDsBoucle; // Test 170404: OK d'après Test 1702..
	nbreMesDsSequence = parseInt(recupNbreMesDsSequence());
	mesureInsertionBoucle = parseInt(recupMesInsertBoucle());
	if (nbreMesDsBoucle + (mesureInsertionBoucle - 1) > nbreMesDsSequence) nbreMesDsSequence = nbreMesDsBoucle + (mesureInsertionBoucle - 1); // 170405
	document.getElementById("champNMesSeq").value = nbreMesDsSequence; // 170405
	//document.getElementById("demo_6").innerHTML = "nbreMesDsSequence: " + nbreMesDsSequence; // Test 170405: OK
}

function signalerNbreBoucles(){ // 170206
	//document.getElementById("demo_5").innerHTML = "Nombre de Boucles: " + recupNbreBoucles(); // Test 170206: OK
} 

function etablirInstantPresent(){ // 160616 
	var dateActuelle = new Date();
	var minutes = dateActuelle.getMinutes();
	var secondes = dateActuelle.getSeconds();
	var millisecondes = dateActuelle.getMilliseconds();
	var instantPresent;
	
	instantPresent = millisecondes + (1000 * secondes) + (60000* minutes);
	
	return instantPresent;
}

function demarArrete() { // déclarée dans PageMaitre (html) sur bouton demAr
    //document.getElementById("demo").innerHTML = "Salut Bert!";
	
	if (marche== false) {
		document.getElementById("boutonDemAr").innerHTML = "Arrêter";
		instantDuDepart = etablirInstantPresent();
		document.getElementById("demo").innerHTML = instantDuDepart;
		//stockerinstantPresent(instantPresent);
		marche = true;
		//alert(marche);
	}
	else {
		marche = false;
		document.getElementById("boutonDemAr").innerHTML = "Démarrer";
		document.getElementById("horiz").value = 0; // 161001 d'après 160824-25
		prochainIndiceEv = 0; // 161102 piqûre de rappel, ici // 160901, placement ici
		prochainIndiceEvPair = 0; // 160914
		prochainIndiceEvImpair = 0; // 160914
		dejaJoueTemps = false;
		dejaJoueSonsPairs = false;
		dejaJoueSonsImpairs = false;
		//alert(marche);
	}
	//return instantPresent;
}

function recupTempo(){
	var tempo;
	tempo = document.getElementById("champTempo").value; // 160622
	var dureeTemps;
	dureeTemps = 60000/tempo;
	
	return dureeTemps; // 160623
}

function calculerDureeDiv(){
	var dureeTemps, nombreDivParTemps, dureeDiv;
	nombreDivParTemps = recupNbreDivPTemps(); // 161011 d'après 160705: fixé à 4 pour le moment, avant réalisation de la zone de saisie html
	dureeTemps = recupTempo();
	dureeDiv = dureeTemps/nombreDivParTemps;
	// document.getElementById("demo_4").innerHTML = "DT: " + Math.floor(dureeTemps) + " DD: " + Math.floor(dureeDiv); // 160625
	return dureeDiv;
}

function activerDecompte(){ // 160920
	var sortie; // Booléen
	sortie = document.getElementById("decompte").checked;
	//document.getElementById,("demo_5").innerHTML = "Etat checkBox?: " + sortie;
	return sortie;
}

function calculerNbreMesuresDecompte(){ // 161209
	var nbreTempsPMesure, nbreMesuresDsDecompte, publicationNbreMesureDsDecompte;
	nbreTempsPMesure = recupNbreTempsPMesure(); // 161209
	publicationNbreMesureDsDecompte = false;
	if(nbreTempsPMesure > 12) nbreMesuresDsDecompte = 1;
	else{
		for (var i = 8; i < 13; i++){
			if (i / nbreTempsPMesure == Math.floor(i / nbreTempsPMesure) && publicationNbreMesureDsDecompte == false){
				nbreMesuresDsDecompte = i / nbreTempsPMesure;
				publicationNbreMesureDsDecompte = true; // 170111: un simple break suffirait
			} // if
		} // for
	} // else
	return nbreMesuresDsDecompte; // 161210
} // F

function jouerUnTempsS2DsDecompte(){ // 170106
	var nbreTempsPMesure, nbreMesures1s2DsDecompte, nbreMesuresDsDecompte; // 170106
	nbreMesuresDsDecompte = calculerNbreMesuresDecompte();
	if (nbreMesuresDsDecompte > 1) nbreMesures1s2DsDecompte = Math.ceil (nbreMesuresDsDecompte/2); 
	else nbreMesures1s2DsDecompte = 0;
	
	var nbreTempsDsDecompte, nbreTempsConcernesPMes1s2, noTempsJoueDsDecompte, tabTpsJouesDsDecompte;
	nbreTempsPMesure = recupNbreTempsPMesure();
	nbreTempsDsDecompte = nbreMesuresDsDecompte * nbreTempsPMesure; // 170112
	
	tabTpsJouesDsDecompte = new Array();
	nbreTempsConcernesPMes1s2 = nbreTempsPMesure * nbreMesures1s2DsDecompte;
	for(var t = 0; t < nbreTempsDsDecompte; t++){
		noTempsJoueDsDecompte = t % nbreTempsPMesure;
		if (t < nbreTempsConcernesPMes1s2 && noTempsJoueDsDecompte / 2 == Math.floor(noTempsJoueDsDecompte / 2) || t >= nbreTempsConcernesPMes1s2 ) tabTpsJouesDsDecompte.push(t); // 170112
	} // for
	
	return tabTpsJouesDsDecompte;
}

function activerMetronome(){ // 161203
	var sortie; // Booléen
	sortie	= document.getElementById("metronome").checked;
	//document.getElementById("demo").innerHTML = "Etat checkBox?: " + sortie;
	return sortie;
}

function etablirPremierIndiceEvDsBoucle(longueurTableauDEvInt, momentDepartBoucleInt, tableauDeMomentsDsEvInt){ // 170207: pour éviter les répétitions homomorphes, événements, pairs, impairs etc., test OK
	var premierIndiceEvDsBoucleInt;
	for (var i = 0; i < longueurTableauDEvInt; i++){
		if (momentDepartBoucleInt <= tableauDeMomentsDsEvInt[i]){
			premierIndiceEvDsBoucleInt = i;
			break;
		}
	}
	return premierIndiceEvDsBoucleInt;
}

function etablirProchainIndiceDesEvenements(tempsVisuelInt, premierEvenementAInt, tableauDeMomentsDsEvInt, longueurTableauDEvInt, premierIndiceEvDsBoucleInt){
	var prochainIndiceEvInt;
	if (tempsVisuelInt == 0 || tempsVisuelInt < premierEvenementAInt){
		prochainIndiceEvInt = 0; // 170208 d'après 160901
	} // if tB == 0 ... (tempsVisuel externe)
			
	else if (tempsVisuelInt > tableauDeMomentsDsEvInt[longueurTableauDEvInt - 1]) prochainIndiceEvInt = premierIndiceEvDsBoucleInt; // 170208 d'après 170124
			
	else if (tempsVisuelInt > tableauDeMomentsDsEvInt[prochainIndiceEvInt] && tempsVisuelInt < tableauDeMomentsDsEvInt[longueurTableauDEvInt -1]){
		if (longueurTableauDEvInt - 1 > prochainIndiceEvInt){
			prochainIndiceEvInt += 1; // 170208 d'après 160901, d'après réflexion agenda 160831 (jour prérentrée)
		} // if
	} // else if tempsVisuel interne
	return prochainIndiceEvInt; // 170208
}

// *** GESTION du CANVAS ***

window.addEventListener('load', function() { // 160616: jusqu'à la fin du fichier js

	var canvas  = document.querySelector('#canvas');
	var context = canvas.getContext('2d');
	var cache = canvas.getContext('2d'); // 160930: un autre objet dans le même canvas.
	// var traits = canvas.getContext('2d'); // 161002
	
	var posXCurseur = 110;
	
	function ecrireMessagePos(canvas, messagePos) {
        //var context = canvas.getContext('2d');
       // context.clearRect(0, 0, canvas.width, canvas.height); // efface sur toute la surface du canvas les précédentes inscriptions
        context.font = '14pt Calibri';
        context.fillStyle = 'grey';
        context.fillText(messagePos, 10, 25);
	}
	  
	function ecrireMessageSec(canvas, messageSec) {
        context.font = '8pt Calibri';
        context.fillStyle = 'grey';
        context.fillText(messageSec, 30, 25);
	}
	
	function ecrireRepereMesure(repereMesure, posXRepereMes){
		context.font = '14pt Calibri';
        context.fillStyle = "#008000";
        context.fillText(repereMesure, 105 + posXRepereMes, 75);
	}
	
	function ecrireRepereTemps(repereTemps, posXRepereTps){
		context.font = '12pt Calibri';
        context.fillStyle = "#008000";
        context.fillText(repereTemps, 105 + posXRepereTps, 80);
	}
	
	// SELECTEUR
	var posXCell, posYCell, couleurFondCell, CouleurTourCell;
	// var selectionnee = false; //161001: passage en commentaire, voir premierMinistre_1 pour historique
	var posXTrait, posYTrait, couleurTrait, epaisseurTrait, longueurTrait;
	
	function dessinerCellule(posXCell, posYCell, couleurFondCell, couleurTourCell){
		context.beginPath();

		context.moveTo(114+posXCell, 370-posYCell); //  coin nord-ouest : j'ai ajouté posXCellule = 70
		
		context.lineTo(121+posXCell, 370-posYCell); // coin nord-est
		context.quadraticCurveTo(125+posXCell, 370-posYCell, 125+posXCell, 374-posYCell); // vers façade est
		context.lineTo(125+posXCell, 386-posYCell); //façade est
		context.quadraticCurveTo(125+posXCell, 390-posYCell, 121+posXCell, 390-posYCell); //vers plancher sud
		context.lineTo(114+posXCell, 390-posYCell); // plancher sud
		context.quadraticCurveTo(110+posXCell, 390-posYCell, 110+posXCell, 386-posYCell); // vers façade ouest
		context.lineTo(110+posXCell, 374-posYCell); // vers plafond nord
		context.quadraticCurveTo(110+posXCell, 370-posYCell, 114+posXCell, 370-posYCell);
		
		context.closePath();
		context.fillStyle = couleurFondCell;
		context.fill();
		context.strokeStyle = couleurTourCell;
		context.stroke();
	}
	
	function dessinerTrait(posXTrait, posYTrait, couleurTrait, epaisseurTrait, longueurTrait){ // 161002
		context.fillStyle = "couleurTrait";
		context.fillRect(posXTrait, posYTrait /*95*/, epaisseurTrait, longueurTrait /*300*/);
	}
	
	function getMousePos(canvas, evt){  // Position x,y du pointeur
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	  
	//creerTableauDeSelectionPEv2Dim(); // 160703: déplacé ici, en dehors de la fonction evt, afin de stocker la variable ?
	//creerTableauDeSelectionEvP2Dim(); // 160724 : Πλατυς Γιαλλος
	
	var noDivCell, noPisteCell;
		
	canvas.addEventListener('click', function(evt) { // 160531: modèle: mousemove
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ', ' + mousePos.y;
		var noDeVue, decalageVue;
		var nbreDivDsSequence/*, nbreDivPTemps*/;

		nbreDivDsSequence = calculerNbreDivDsSequence();//4 * 4 * nbreDivPTemps;
		noDeVue = recupPositionDerouleurHoriz();
		
		decalageVue = 16*noDeVue;
				
		noDivCell = Math.floor((mousePos.x - 112)/20); // 160701
		noPisteCell = Math.floor((410 - mousePos.y)/40); // 160701
		
		if (tableauDeSelectionGeneralPEv[noPisteCell][noDivCell + decalageVue]==false){ // 160703: sélection
			
			tableauDeSelectionGeneralEvP[noDivCell + decalageVue][noPisteCell]=true; // 160811 Lescherolles
			tableauDeSelectionGeneralPEv[noPisteCell][noDivCell + decalageVue]=true; // 160812 Lescherolles
			
		}else{
			
			tableauDeSelectionGeneralEvP[noDivCell + decalageVue][noPisteCell]=false; // 160812 Lescherolles
			tableauDeSelectionGeneralPEv[noPisteCell][noDivCell + decalageVue]=false; // 160812 Lescherolles
		}
		
		// document.getElementById("demo_16").innerHTML = "noVue: " + noDeVue + " / decalageVue: " + decalageVue + " longueur tableau de sélection: " + tableauDeSelectionGeneralEvP.length; // 160811:et 12 test OK
		
		remettreAZeroTableauxDEvenements(); // 161102: substitué à répétition des instructions
				
		var dureeDiv; // 160829: rappel de la variable et exécution de la fonction de calcul à l'arrêt.
		dureeDiv = calculerDureeDiv();
		
		for (var m = 0; m < nbreDivDsSequence; m++){ // 160821: Paris après panne trackpad: passage au tableau général.
			//for (var n = 0; n < 3; n++){
				if (tableauDeSelectionGeneralEvP[m].indexOf(true) != -1){
					tableauDEvenements.push(m); // 160726
					tableauDeMomentsDsEv.push(Math.floor(m*dureeDiv)); // 160829
					if (m/2 == Math.floor(m/2)){
						tableauDEvenementsPairs.push(m); // 160909
						tableauDeMomentsDsEvPairs.push(Math.floor(m*dureeDiv)); // 160914
					}else{
						tableauDEvenementsImpairs.push(m); // 160909
						tableauDeMomentsDsEvImpairs.push(Math.floor(m*dureeDiv)); // 160914, test OK mais NaN
					}
				}
			//} // for n pistes
		} // for m div
		
		var longueurTableauDEv, longueurTableauDEvPairs, longueurTableauDEvImpairs; // 160912
		longueurTableauDEv = tableauDEvenements.length;
		longueurTableauDEvPairs = tableauDEvenementsPairs.length;
		longueurTableauDEvImpairs = tableauDEvenementsImpairs.length;
		
		for (var q=0; q < longueurTableauDEv; q++){
			tableauDePistesPEvenement[q] = new Array();
			for (var n = 0; n < 3; n++){ // nombre de pistes
				if (tableauDeSelectionGeneralEvP[tableauDEvenements[q]][n] == true){ //160821: généralisation
					tableauDePistesPEvenement[q].push(n);
				} // if tS
			} // for n pistes
			// tableauDePistesPEvenement.push(tableauDePistesPEvenement_q)
		} // for q = TdEv.length
		
		for (var r=0; r < longueurTableauDEvPairs; r++){
			tableauDePistesPEvenementsPairs[r] = new Array();
			for (var s = 0; s < 3; s++){ // nombre de pistes
				if (tableauDeSelectionGeneralEvP[tableauDEvenementsPairs[r]][s] == true){ //160912, d'après 160821: généralisation
					tableauDePistesPEvenementsPairs[r].push(s);
				} // if tS
			} // for s pistes
		} // for r = TdEvP.length
		
		for (var t=0; t < longueurTableauDEvImpairs; t++){
			tableauDePistesPEvenementsImpairs[t] = new Array();
			for (var u = 0; u < 3; u++){ // nombre de pistes
				if (tableauDeSelectionGeneralEvP[tableauDEvenementsImpairs[t]][u] == true){ //160912, d'après 160821: généralisation
					tableauDePistesPEvenementsImpairs[t].push(u);
				} // if tS
			} // for u pistes
		} // for t = TdEvImp.length
		// document.getElementById("demo_12").innerHTML = "TdEv: "  + tableauDEvenements + " / TdEvP: "  + tableauDEvenementsPairs + " / TdEvImP: "  + tableauDEvenementsImpairs +" / TdMoments: "  + tableauDeMomentsDsEv +" / TdMomentsEvP: "  + tableauDeMomentsDsEvPairs+" / TdMomentsEvImp: "  + tableauDeMomentsDsEvImpairs + " / TPpEv: " + tableauDePistesPEvenement + " / TPpEvP: " + tableauDePistesPEvenementsPairs + " / TPpEvImp: " + tableauDePistesPEvenementsImpairs;     
	}, false); // fin fonction click sélection

// *** FONCTION TEMPORELLE, de redessinage complet du Canvas à chaque frame temporelle ***************************************************
//                          et de jeu des sons	  
	function animerCurseur(posXCurseur) { // 160616: draw sur le modèle, le nom de fonction est peut-être important, test: NON, animerCurseur ou chien ou chat vont aussi bien.
	
		context.save();
		context.clearRect(0, 0, 515, 400);
		
		// CELLULES
		
		var tableauDeCellules = new Array();
		//var ligneCellules = new Array();
		var noDeVue = recupPositionDerouleurHoriz(); // 160812: récup au redessinage temporel, 
		var decalageVue; // 160906
		decalageVue = 16*noDeVue;
		var nbreDivDsSequence/*, nbreDivPTemps*/;
		//nbreDivPTemps = recupNbreDivPTemps();
		nbreDivDsSequence = calculerNbreDivDsSequence();// * 4 * nbreDivPTemps;
			
		
			
		// TRAITS
		
		var traitsDeMesures = new Array(); // 161003
		var traitsDeTemps = new Array(); // 161005
		var plotsNoDeMesure = new Array(); // 161008
		var plotsNoDeTrait = new Array(); // 161009
		
		var nbreDivPTemps, nbreDivPMesure, nbreTempsPMesure; // 161011
		nbreDivPTemps = recupNbreDivPTemps(); // 161011
		nbreTempsPMesure = recupNbreTempsPMesure(); // 161019
		nbreDivPMesure = nbreTempsPMesure * nbreDivPTemps; // 161019, révision d'après 161011, 4 temps par mesure pour le moment. Paramétrer ensuite. 
		
		if (nbreDivPMesure != NaN && nbreDivPMesure != 0){ // 161029: Le Moulin du Cluzeau, Thollet dans la Vienne (86)
			for (var v = 0; v < 21; v++){	// 161004, 161005: 21 a.l.d. 20 pour barre de fin de vue
				if ((v + decalageVue) % nbreDivPMesure == 0){ // 161005: 16 à remplacer par nbreDivPMesure
					traitsDeMesures[v] = dessinerTrait(109+ (20*v), 85, "#999999", 1.5, 310);
				}
				else if ((v + decalageVue) % nbreDivPTemps == 0 && (v + decalageVue) % nbreDivPMesure != 0){
					traitsDeTemps[v] = dessinerTrait(109+ (20*v), 95, "#999999", 0.5, 300); 
				}
			}
		
			for (var w = 0; w < 21; w++){	// 161009 d'après 161004, 161005: 21 a.l.d. 20 pour barre de fin de vue
				if ((w + decalageVue) % nbreDivPMesure == 0){ // 161005: 16 à remplacer par nbreDivPMesure
					plotsNoDeMesure [w] = ecrireRepereMesure(1 + Math.floor((w + decalageVue)/nbreDivPMesure), 20*w);
				}
				else if ((w + decalageVue) % nbreDivPTemps == 0 && (w + decalageVue) % nbreDivPMesure != 0){
					plotsNoDeTrait[w] = ecrireRepereTemps(((w + decalageVue) / nbreDivPTemps)% nbreTempsPMesure + 1, 20*w); // 161009, revu 161019
				} // else if
			} // for 21
		} // if != NaN && 0
		//ecrireRepereMesure(canvas, repereMesure, posXRepereMes); // 161008: essai
		
		for (var k = 0; k < 3; k++){ // 160628: OK: n° de piste à l'extérieur
				tableauDeCellules [k] = new Array();
				for (var l = 0; l < 20; l++){
					if (tableauDeSelectionGeneralPEv[k][l + decalageVue]==false || l + decalageVue > nbreDivDsSequence - 1){ // 160812: généralisation, 160813: correctif: ||...
						tableauDeCellules [k][l] = dessinerCellule(2+(l*20), k*40, "#cccccc", "#777777" );
					}else if (tableauDeSelectionGeneralPEv[k][l + decalageVue]==true){
						tableauDeCellules [k][l] = dessinerCellule(2+(l*20), k*40, "#a4002f", "#710021" );
					} // if selection
				} // for l
			} // for k
		
		// CURSEUR et plus généralement animation des éléments visuels du Canvas
		context.strokeStyle = "rgba(23, 145, 167, 0.8)";
		context.beginPath();
		context.moveTo(posXCurseur, 95);  // 1er point (x, y)
		context.lineTo(posXCurseur, 395); // 2e point
		context.stroke(); // 160616, obligatoire sinon pas dessiné.
		
		context.restore();
		
		// CACHE 160930
		
		cache.fillStyle = "#fbf8d7";
		cache.fillRect(515, 0, 50, 400);
		
		var temps = new Date();
		var minutes = temps.getMinutes();
		var secondes = temps.getSeconds();
		var millisecondes = temps.getMilliseconds();
		// var tempsActuel = millisecondes + (1000 * secondes) + (60000 * minutes); // 170626: passé en commentaire: ne sert pas.
		//var instantPresent = 
		//document.getElementById("demo_2").innerHTML = etablirInstantPresent();
		var messageSec = 'Boîte à rythme v.1'; // 180219: changement du message
		
		if (marche==true){
			var instantPresent;
			instantPresent = etablirInstantPresent();
			//document.getElementById("demo_2").innerHTML = instantDuDepart; // 160624
			document.getElementById("demo_2").innerHTML = instantPresent; // 160624
			
			var tempsSequenceAbs; //1606..
			tempsSequenceAbs = instantPresent - instantDuDepart;
			if (tempsSequenceAbs <0){
				tempsSequenceAbs += 3600000; // ajout: 160830: passage de l'heure (= 3600000 ms)
			}
			document.getElementById("demo_3").innerHTML = tempsSequenceAbs; // 160624
			
			// *** Etablissement prochain temps théorique & vitesse curseur: rappel: durée temps:
			
			var dureeTemps;
			dureeTemps = recupTempo();
			var dureeDiv, ancienneDureeDiv, longueurTableauDEv, longueurTableauDEvPairs, longueurTableauDEvImpairs;
			dureeDiv = calculerDureeDiv();
			
			longueurTableauDEv = tableauDEvenements.length; // 160906
			longueurTableauDEvPairs = tableauDEvenementsPairs.length; // 160913, d'après 160906
			longueurTableauDEvImpairs = tableauDEvenementsImpairs.length; // 160913, d'après 160906
			
			if(dureeDiv!=ancienneDureeDiv) // 160906 clause d'allègement des calculs
			{
				tableauDeMomentsDsEv.splice(0, longueurTableauDEv); // 160903: réfection tableau de Moments si changement de tempo
				tableauDeMomentsDsEvPairs.splice(0, longueurTableauDEvPairs); // 160914
				tableauDeMomentsDsEvImpairs.splice(0, longueurTableauDEvImpairs); // 160914
				
				for (var j=0; j< longueurTableauDEv; j++){
					tableauDeMomentsDsEv.push(tableauDEvenements[j]*dureeDiv);
				}
				
				for (var jp=0; jp< longueurTableauDEvPairs; jp++){
					tableauDeMomentsDsEvPairs.push(tableauDEvenementsPairs[jp]*dureeDiv); // 160914
				}
				
				for (var ji=0; ji< longueurTableauDEvImpairs; ji++){
					tableauDeMomentsDsEvImpairs.push(tableauDEvenementsImpairs[ji]*dureeDiv); // 160914, test OK
				}
				ancienneDureeDiv = dureeDiv;
			}
			
			var decompte = false; // 160706 dépendra d'une case à cocher, pour le moment true = cochée
			var dureeDecompte, nbreMesureDecompte;
			var nbreTempsPMesure; // 160706 dépendra d'une zone de saisie utilisateur, 
			nbreTempsPMesure = recupNbreTempsPMesure(); // 161019
			decompte = activerDecompte();
			//document.getElementById,("demo_5").innerHTML = "Etat checkBox?: " + decompte;
			nbreMesureDecompte = calculerNbreMesuresDecompte(); // 161210
			
			if (decompte){ //160826
				dureeDecompte = dureeTemps * nbreTempsPMesure * nbreMesureDecompte; // 160706
			}else{
				dureeDecompte = 0; // 160826
			}
						
			var dureeNormaleBoucleCurseur; /*, nbreDivDsSequence*/  // 160626 + 161011
			//nbreDivDsSequence = 4 * 4 * nbreDivPTemps; // 161011
			//dureeBoucleCurseur = 5 * dureeTemps; // 5 temps en visuel 0 par défaut au 160626 (= 1 mesure  temps + 1er temps mesure 2)
			//dureeBoucleCurseur = 16 * dureeDiv; // 160823: (4temps x 4div) en saisie utilisateur plus tard.
			
			var tempsBoucleCurseur, tempsSequenceCorrige, nbreDivParcouruesAbs, nbreDivParcouruesBoucle, positionInduiteDerouleurHoriz, nbreVues, nbreDivDsDerniereVue, dureeTotaleVirtuelleCourseCurseur; // 161022, 161020: ajout nbreVues
			
			nbreVues = calculerNbreVuesDsSequence(); // 161020
			nbreDivDsDerniereVue = nbreDivDsSequence - 16 * (nbreVues - 1);
			dureeNormaleBoucleCurseur = 16 * dureeDiv; // * (noDeVue < nbreVues -1) + (nbreDivDsDerniereVue * dureeDiv) * (noDeVue == nbreVues - 1) // 161022 Mac Do Rungis Tour Mercure
			dureeTotaleVirtuelleCourseCurseur = nbreDivDsSequence * dureeDiv; // 161023, 1 rue Le Goff (sic les mots de Sartre)
			
			tempsSequenceCorrige = tempsSequenceAbs - dureeDecompte; // 160825
			tempsBoucleCurseur = tempsSequenceCorrige % dureeNormaleBoucleCurseur;
			nbreDivParcouruesAbs = Math.floor(tempsSequenceCorrige / dureeDiv); // 160825
			
			var nbrePxPMilS, dureeVisuel, dureeBoucle, dureeBoucleAlt, dureeBoucle_2, dureeVisuelleBoucle, dureeBoucleAbs, tempsBoucle, tempsBoucleVisuelle, tempsBoucleVisuelleAlt, noBoucleVisuelle, noBoucleVisuelleAlt, nbreMesuresDsSequence, noBoucleVisuelleBrut, noBoucleVisuelleBrutAlt, tempsVisuel, momentDepartBoucleAlt, momentVisuelSortieBoucle, momentSortieDeBoucle, nbreBoucles, nbreMesuresDsBoucleAlt, nbreMesuresDsBoucleVisuelle, noMesureInsertionBoucle, nbreDivParcouruesVisuelles, dureeSequence; // 161024: ajouts // 170116, 170121, 170122, 170215
			//nbrePxPMilS = 400/dureeBoucleCurseur; // 160626: 400 = 20 cel X 20 pix
			nbreMesuresDsSequence = recupNbreMesDsSequence(); // 161103
			noMesureInsertionBoucle = recupMesInsertBoucle(); // 170116
			//document.getElementById("demo_6").innerHTML = "noMesureInsertionBoucle: " + noMesureInsertionBoucle; // 170318: test OK
			nbreMesuresDsBoucleVisuelle = recupNbreMesDsBoucle(); // 170216
			nbreBoucles = recupNbreBoucles(); // 170215
			//document.getElementById("demo_6").innerHTML = "nombreBoucles: " + nbreBoucles; // 170318: test OK
			
			nbrePxPMilS = 20 / dureeDiv; // // 320/dureeNormaleBoucleCurseur; // 160823: 320 = 16 cel X 20 pix
			dureeBoucle = nbreMesuresDsSequence * nbreTempsPMesure * nbreDivPTemps * dureeDiv; // 161024: déplacement ici // 160902: juste le tempo paramétrable pour le moment
															// 161011: paramétrage du nombre de division par temps
			dureeVisuel = nbreMesuresDsSequence * nbreTempsPMesure * nbreDivPTemps * dureeDiv; // 170202 d'après 161024 ci-dessus
			dureeVisuelleBoucle = nbreMesuresDsBoucleVisuelle * nbreTempsPMesure * nbreDivPTemps * dureeDiv; // 170215-16
			//document.getElementById("demo_6").innerHTML = "dureeVisuelleBoucle: " + dureeVisuelleBoucle; // 170318: test OK
			
			//nbreMesuresDsBoucleAlt = 1 + (nbreMesuresDsSequence - noMesureInsertionBoucle); // 170116: fixé à 4+1 (fin, début mesure 5) de séquence totale et insertion variable pour le moment pour le raisonnement.
			//dureeBoucleAlt = nbreMesuresDsBoucleAlt * nbreTempsPMesure * nbreDivPTemps * dureeDiv; // 170116
			dureeBoucle_2 = dureeVisuelleBoucle * ((nbreBoucles - 1) * (nbreBoucles > 0) + 100000000 * (nbreBoucles == 0)); // 170216
			//document.getElementById("demo_6").innerHTML = "dureeBoucle_2: " + dureeBoucle_2; // 170318: test OK
			
			momentDepartBoucleAlt = (noMesureInsertionBoucle - 1) * nbreTempsPMesure * nbreDivPTemps * dureeDiv; // 170119
			//document.getElementById("demo_6").innerHTML = "moment de départ de la boucle: " + momentDepartBoucleAlt ; // 170318 OK 170119 170116 et 170117
			
			momentVisuelSortieBoucle = momentDepartBoucleAlt + dureeVisuelleBoucle; // 170217
			//document.getElementById("demo_6").innerHTML = "momentVisuelSortieBoucle: " + momentVisuelSortieBoucle; // 170318: test OK
			momentSortieDeBoucle = momentVisuelSortieBoucle + dureeBoucle_2; // 170217
			//document.getElementById("demo_6").innerHTML = "momentSortieDeBoucle: " + momentSortieDeBoucle; // 170318: test OK
			dureeSequence = dureeVisuel + dureeBoucle_2; // 170217
			//document.getElementById("demo_6").innerHTML = "dureeSequence: " + dureeSequence; // 170318: test OK
			//document.getElementById,("demo_5").innerHTML = "noMesureInsertionBoucle: " + noMesureInsertionBoucle;
			//tempsBoucle = tempsSequenceCorrige % dureeBoucle; // 161024: déplacement ici // 160902: test OK
			
			tempsVisuel = tempsSequenceCorrige * (tempsSequenceCorrige < momentVisuelSortieBoucle) + (tempsSequenceCorrige >= momentVisuelSortieBoucle && tempsSequenceCorrige < momentSortieDeBoucle) * ((tempsSequenceCorrige - momentDepartBoucleAlt) % dureeVisuelleBoucle + momentDepartBoucleAlt) + (tempsSequenceCorrige >= momentSortieDeBoucle && tempsSequenceCorrige <= dureeSequence)*(tempsSequenceCorrige + momentVisuelSortieBoucle - momentSortieDeBoucle) ; // 170217 d'après 170211 d'après: * (tempsSequenceCorrige < dureeVisuel) + (tempsSequenceCorrige >= dureeVisuel) * ((tempsSequenceCorrige % dureeBoucleAlt) + momentDepartBoucleAlt * (dureeBoucleAlt <= momentDepartBoucleAlt))); // 170211 ne fonctionne pas après 1 boucle revient à 0 d'après 170210 étude séparée, d'après: % dureeBoucleAlt + dureeBoucleAlt * (tempsSequenceCorrige > momentDepartBoucleAlt && (tempsSequenceCorrige % dureeBoucleAlt) < momentDepartBoucleAlt); // 170206 corrige 170119 cf. jsfiddle tempsVisuelAlgo: test OK le 170206
			//document.getElementById("demo_7").innerHTML = "temps Visuel: " + tempsVisuel ; // 170119
			//document.getElementById("demo_7").innerHTML = "temps visuel boucle alt: " + tempsVisuel ; // 170119
			
			
			//noBoucleVisuelleBrut = Math.floor(tempsBoucle/(16*dureeDiv)); // 161024, 170120: tentative substitution de tempsBoucle par tempsVisuel, prématuré mais fonctionne pour le jeu des sons pas pour le visuel => révision architecture.
			noBoucleVisuelleBrutAlt = Math.floor(tempsVisuel/(16*dureeDiv)); // 170121
			
			//noBoucleVisuelle = noBoucleVisuelleBrut * (noBoucleVisuelleBrut < nbreVues) + ((nbreVues - 1) * (noBoucleVisuelleBrut == nbreVues)); // 161108 Clinton vs Trump ?
			noBoucleVisuelleAlt = noBoucleVisuelleBrutAlt * (noBoucleVisuelleBrutAlt < nbreVues) + ((nbreVues - 1) * (noBoucleVisuelleBrutAlt == nbreVues)); // 170121 d'après 161108, test OK
			
			//tempsBoucleVisuelle = tempsBoucle - (noBoucleVisuelle * 16 * dureeDiv); // 161024,
			tempsBoucleVisuelleAlt = tempsVisuel - (noBoucleVisuelleAlt * 16 * dureeDiv); // 170121 d'après 161024, test OK
			
			// posXCurseur = 110 + tempsBoucleCurseur * nbrePxPMilS;
			// document.getElementById("demo_8").innerHTML = Math.floor(tempsBoucleVisuelle); // 160626 modifié 161024
			//var nbreDivDsSequenceAlt, nbreDivDsBoucleAlt;
			//nbreDivDsSequenceAlt = nbreDivDsSequence - 
			
			nbreDivParcouruesBoucle = nbreDivParcouruesAbs % nbreDivDsSequence; // 160825, déplacé ici, 170121, test OK
			nbreDivParcouruesVisuelles = Math.floor(tempsVisuel / dureeDiv); // 170121, 170122
			//document.getElementById("demo_8").innerHTML = "nbre div parcourues ds séq av boucle alt: " + nbreDivParcouruesVisuelles ; // 170122
			
			positionInduiteDerouleurHoriz = Math.floor((nbreDivParcouruesVisuelles * 1000) / nbreDivDsSequence); // 161012
			document.getElementById("horiz").value = positionInduiteDerouleurHoriz; // 160824-25 // révisé 161012: substitué positDeroulHorizontal à ?// 170122: mise à jour avec boucle amovible 
			
			if (tempsSequenceAbs < dureeDecompte){ // 160822
				posXCurseur = 110;
			}else{
				posXCurseur = 110 + (tempsBoucleVisuelleAlt * nbrePxPMilS); // 161024 (c/o Patrice Benjamin): changé variable de ref. (TBCurseur par TBVisuelle)//posXCurseur + 0.5; réformé 160626
				// if (posXCurseur >= 510) posXCurseur = 110;
				//document.write(posXCurseur);
			}
			
			var numeroDeTempsSequenceAbs; // 160707 // 160827: ajout du suffixe Abs, incluant le décompte.
			numeroDeTempsSequenceAbs = Math.ceil(tempsSequenceAbs/dureeTemps);
			// document.getElementById("demo_13").innerHTML = numeroDeTempsSequenceAbs;
			
			var prochainTemps, prochaineDiv, premierEvenementA, premierEvenementPairA, premierEvenementImpairA, longueurTableauDEv, longueurTableauDEvPairs, longueurTableauDEvImpairs, prochainEvenementDans, prochainEvenementPairDans, prochainEvenementImpairDans, noDivProchEv, divPrEvPaire;
			
			prochainTemps = dureeTemps * numeroDeTempsSequenceAbs; // 160625
			prochaineDiv = dureeDiv * Math.ceil(tempsSequenceAbs/dureeDiv); // 160705
			
			longueurTableauDEv = tableauDEvenements.length; // 160901
			longueurTableauDEvPairs = tableauDEvenementsPairs.length; // 160910
			longueurTableauDEvImpairs = tableauDEvenementsImpairs.length; // 160910
			
			// Réglage premiers événements à:
			if(longueurTableauDEv > 0){
				premierEvenementA = tableauDeMomentsDsEv[0];
			}else{
				premierEvenementA = -10000000;
			}
			
			if(longueurTableauDEvPairs > 0){ // 160910
				premierEvenementPairA = tableauDeMomentsDsEvPairs[0]; // 160914
			}else{
				premierEvenementPairA = -10000000;
			}
			
			if(longueurTableauDEvImpairs > 0){
				premierEvenementImpairA = tableauDeMomentsDsEvImpairs[0]; // 160914: test OK
			}else{
				premierEvenementImpairA = -10000000;
			}
			
			// Réglage des prochains indices d'événements, 170124: substitué tempsVisuel à tempsBoucle => aménagements
						
			var premierIndiceEvDsBoucleReglable = 0, dernierIndiceEvDsBoucleReglable = 0; // 170218: ajout dernierIndice, 170124
			//premierIndiceEvDsBoucleReglable = etablirPremierIndiceEvDsBoucle(longueurTableauDEv, momentDepartBoucleAlt, tableauDeMomentsDsEv); // 170207
			for (var b = 0; b < longueurTableauDEv; b++){
				if (momentDepartBoucleAlt <= tableauDeMomentsDsEv[b]){
					premierIndiceEvDsBoucleReglable = b;
					break;
				}
			}
			for (var bd = 0; bd < longueurTableauDEv; bd++){
				if (tableauDeMomentsDsEv[bd] <= momentVisuelSortieBoucle){
					dernierIndiceEvDsBoucleReglable = bd ;
				}
			}
			if (tableauDeMomentsDsEv[longueurTableauDEv - 1] > momentVisuelSortieBoucle) dernierIndiceEvDsBoucleReglable -= 1; // 170322 d'après 170320
			
			//document.getElementById("demo_9").innerHTML = "premier et dernier Indice d'événements boucle: " + premierIndiceEvDsBoucleReglable +", " + dernierIndiceEvDsBoucleReglable ; // 170218, 170124: test OK
			var momentSeqDernIndiceAvSortieBoucle; // = (nbreBoucles > 0) * (nbreBoucles - 1) * dureeVisuelleBoucle + tableauDEvenements [dernierIndiceEvDsBoucleReglable - 1] ;
			momentSeqDernIndiceAvSortieBoucle = (nbreBoucles > 0) * ((nbreBoucles - 1) * dureeVisuelleBoucle + tableauDeMomentsDsEv [dernierIndiceEvDsBoucleReglable]) + (nbreBoucles == 0) * 100000000 ; // 170322 d'après 170320
			
			if (tempsVisuel == 0 || tempsVisuel < premierEvenementA /*|| tempsVisuel > tableauDeMomentsDsEv[longueurTableauDEv - 1]*/){
				prochainIndiceEv = 0; // 160901
			} // if tB == 0 ... (tempsVisuel externe)
			
			//else if (tempsVisuel > tableauDeMomentsDsEv[0] && tempsVisuel < tableauDeMomentsDsEv[dernierIndiceEvDsBoucleReglable - 1] || (tempsVisuel >= tableauDeMomentsDsEv[dernierIndiceEvDsBoucleReglable - 1] && tempsVisuel <= momentVisuelSortieBoucle && tempsSequenceCorrige >= momentSeqDernIndiceAvSortieBoucle ) || (tempsVisuel > momentVisuelSortieBoucle && tempsVisuel < tableauDeMomentsDsEv[longueurTableauDEv -1] )){
			else if (tempsVisuel > tableauDeMomentsDsEv[0] && tempsVisuel < tableauDeMomentsDsEv[dernierIndiceEvDsBoucleReglable] || (tempsVisuel > tableauDeMomentsDsEv[dernierIndiceEvDsBoucleReglable] && tempsSequenceCorrige > (momentSortieDeBoucle - dureeVisuelleBoucle) && tempsVisuel < tableauDeMomentsDsEv[longueurTableauDEv -1] )){
					if (tempsVisuel > tableauDeMomentsDsEv[prochainIndiceEv]) prochainIndiceEv += 1;
			} //prochainIndiceEv = premierIndiceEvDsBoucleReglable; // 170220, révision de 170124
			
			else if (tempsVisuel > tableauDeMomentsDsEv[dernierIndiceEvDsBoucleReglable] && tempsVisuel < momentVisuelSortieBoucle &&  tempsSequenceCorrige < momentSeqDernIndiceAvSortieBoucle) prochainIndiceEv = premierIndiceEvDsBoucleReglable; // 170222
			
			// else if (tempsVisuel >= momentVisuelSortieBoucle){ // 170220
				// if (dernierIndiceEvDsBoucleReglable < (longueurTableauDEv - 1)) prochainIndiceEv = dernierIndiceEvDsBoucleReglable + 1;
				// else prochainIndiceEv = 0;
			// }
			
			//else if (tempsVisuel > tableauDeMomentsDsEv[prochainIndiceEv] && tempsVisuel < tableauDeMomentsDsEv[longueurTableauDEv -1]){
				//if (longueurTableauDEv - 1 > prochainIndiceEv){
					// prochainIndiceEv += 1; // 160901, d'après réflexion agenda 160831 (jour prérentrée)
				//} // if
			//} // else if tempsVisuel interne
			//document.getElementById("demo_10").innerHTML = "prochain Indice d'événement: " + prochainIndiceEv ; // 170220
			//document.getElementById("demo_10").innerHTML = "moment dernier Indice avant sortie de boucle: " + momentSeqDernIndiceAvSortieBoucle ; // 170223
			// prochains indices d'événements pairs
			var premierIndiceEvPairDsBoucleReglable = 0, dernierIndiceEvPairDsBoucleReglable = 0;
			// 170224 d'après 170218: ajout dernierIndice, 170124; // 170127
			//premierIndiceEvPairDsBoucleReglable = etablirPremierIndiceEvDsBoucle(longueurTableauDEvPairs, momentDepartBoucleAlt, tableauDeMomentsDsEvPairs); // 170207
			for (var bp = 0; bp < longueurTableauDEvPairs; bp++){
				if (momentDepartBoucleAlt <= tableauDeMomentsDsEvPairs[bp]){
					premierIndiceEvPairDsBoucleReglable = bp;
					break;
				}
			}
			for (var dp = 0; dp < longueurTableauDEvPairs; dp++){
				if (tableauDeMomentsDsEvPairs[dp] <= momentVisuelSortieBoucle){
					dernierIndiceEvPairDsBoucleReglable = dp ;
				}
			}
			if (tableauDeMomentsDsEvPairs[longueurTableauDEvPairs - 1] > momentVisuelSortieBoucle) dernierIndiceEvPairDsBoucleReglable -= 1; // 170320, test OK
			//document.getElementById("demo_6").innerHTML = "momentVisuelSortieBoucle: " + momentVisuelSortieBoucle ; // 170319
			//document.getElementById("demo_6").innerHTML = "dernIndEvPairDsBoucleR: " + dernierIndiceEvPairDsBoucleReglable ; // 170319: le "bug" est ici, mauvais raisonnement.
			
			var momentSeqDernIndicePairAvSortieBoucle; // = (nbreBoucles > 0) * (nbreBoucles - 1) * dureeVisuelleBoucle + tableauDEvenements [dernierIndiceEvDsBoucleReglable - 1] ;
			momentSeqDernIndicePairAvSortieBoucle = (nbreBoucles > 0) * ((nbreBoucles - 1) * dureeVisuelleBoucle + tableauDeMomentsDsEvPairs [dernierIndiceEvPairDsBoucleReglable]) + (nbreBoucles == 0) * 100000000 ; // 170320: OK
			//document.getElementById("demo_9").innerHTML = "momentSeqDernIndicePairAvSortieBoucle: " + momentSeqDernIndicePairAvSortieBoucle ; // 170127 d'après 170124: test OK
			//document.getElementById("demo_6").innerHTML = "momentSeqDernIndicePairAvSortieBoucle: " + momentSeqDernIndicePairAvSortieBoucle ; // 170320
			//document.getElementById("demo_9").innerHTML = "dernierIndiceEvPairDsBoucleReglable:" + dernierIndiceEvPairDsBoucleReglable ; // 170127 d'après 170124: test OK
			if (tempsVisuel == 0 || tempsVisuel < premierEvenementPairA /*|| tempsVisuel > tableauDeMomentsDsEvPairs[longueurTableauDEvPairs - 1]*/){
				prochainIndiceEvPair = 0; // 160911 d'après 160901, modif 170127
			} // if tB == 0 ... (tempsVisuel externe des événements pairs)
			
			//else if (tempsVisuel > tableauDeMomentsDsEvPairs[longueurTableauDEvPairs - 1]) prochainIndiceEvPair = premierIndiceEvPairDsBoucleReglable; // 170127 d'après 170124
			else if (tempsVisuel > tableauDeMomentsDsEvPairs[0] && tempsVisuel < tableauDeMomentsDsEvPairs[dernierIndiceEvPairDsBoucleReglable] || (tempsVisuel > tableauDeMomentsDsEvPairs[dernierIndiceEvPairDsBoucleReglable] && tempsSequenceCorrige > (momentSortieDeBoucle - dureeVisuelleBoucle) && tempsVisuel < tableauDeMomentsDsEvPairs[longueurTableauDEvPairs -1] )){
					if (tempsVisuel > tableauDeMomentsDsEvPairs[prochainIndiceEvPair]) prochainIndiceEvPair += 1; // 170224
			} // 170224 : retiré, bloquait le déroulement: /*|| (tempsVisuel >= tableauDeMomentsDsEvPairs[dernierIndiceEvPair - 1] && tempsVisuel <= momentVisuelSortieBoucle && tempsSequenceCorrige >= momentSeqDernIndicePairAvSortieBoucle )*/
			// else if (tempsVisuel > tableauDeMomentsDsEvPairs[prochainIndiceEvPair] && tempsVisuel < tableauDeMomentsDsEvPairs[longueurTableauDEvPairs -1]){
				// if (longueurTableauDEvPairs - 1 > prochainIndiceEvPair){
					// prochainIndiceEvPair += 1; // 160901, d'après réflexion agenda 160831 (jour prérentrée)
				// } // if
			// // else if tempsVisuel interne des événements pairs
			else if (tempsVisuel > tableauDeMomentsDsEvPairs[dernierIndiceEvPairDsBoucleReglable] && tempsVisuel < momentVisuelSortieBoucle &&  tempsSequenceCorrige < momentSeqDernIndicePairAvSortieBoucle) prochainIndiceEvPair = premierIndiceEvPairDsBoucleReglable ; // 170224 d'après 170222
			document.getElementById("demo_10").innerHTML = "prochain Indice d'événement pair: " + prochainIndiceEvPair ; // 170127
			
			// prochains indices d'événements impairs
			var premierIndiceEvImpairDsBoucleReglable = 0, dernierIndiceEvImpairDsBoucleReglable = 0; // 170301 d'après 170208
			//premierIndiceEvImpairDsBoucleReglable = etablirPremierIndiceEvDsBoucle(longueurTableauDEvImpairs, momentDepartBoucleAlt, tableauDeMomentsDsEvImpairs); // 170208
			for (var bi = 0; bi < longueurTableauDEvImpairs; bi++){
				if (momentDepartBoucleAlt <= tableauDeMomentsDsEvImpairs[bi]){
					premierIndiceEvImpairDsBoucleReglable = bi;
					break;
				}
			}
			for (var di = 0; di < longueurTableauDEvImpairs; di++){
				if (tableauDeMomentsDsEvImpairs[di] <= momentVisuelSortieBoucle){
					dernierIndiceEvImpairDsBoucleReglable = di;
				}
			}
			if (tableauDeMomentsDsEvImpairs[longueurTableauDEvImpairs - 1] > momentVisuelSortieBoucle) dernierIndiceEvImpairDsBoucleReglable -= 1; // 170321, d'après 170320
						
			var momentSeqDernIndiceImpairAvSortieBoucle; // 170301
			momentSeqDernIndiceImpairAvSortieBoucle = (nbreBoucles > 0) * ((nbreBoucles - 1) * dureeVisuelleBoucle + tableauDeMomentsDsEvImpairs [dernierIndiceEvImpairDsBoucleReglable]) + (nbreBoucles == 0) * 100000000 ;
			document.getElementById("demo_11").innerHTML = "premier Indice d'événement impair dans la boucle réglable: " + premierIndiceEvImpairDsBoucleReglable ; // 170210
			if (tempsVisuel == 0 || tempsVisuel < premierEvenementImpairA /*|| tempsVisuel > tableauDeMomentsDsEvImpairs[longueurTableauDEvImpairs - 1]*/){
				prochainIndiceEvImpair = 0; // 160911 d'après 160901, modif 170208
			} // if tB == 0 ... (tempsVisuel externe des événements impairs)
			
			//else if (tempsVisuel > tableauDeMomentsDsEvImpairs[longueurTableauDEvImpairs - 1]) prochainIndiceEvImpair = premierIndiceEvImpairDsBoucleReglable; // 170208 d'170127 d'après 170124
			else if (tempsVisuel > tableauDeMomentsDsEvImpairs[0] && tempsVisuel < tableauDeMomentsDsEvImpairs[dernierIndiceEvImpairDsBoucleReglable] || (tempsVisuel > tableauDeMomentsDsEvImpairs[dernierIndiceEvImpairDsBoucleReglable] && tempsSequenceCorrige > (momentSortieDeBoucle - dureeVisuelleBoucle) && tempsVisuel < tableauDeMomentsDsEvImpairs[longueurTableauDEvImpairs -1] )){
					if (tempsVisuel > tableauDeMomentsDsEvImpairs[prochainIndiceEvImpair]) prochainIndiceEvImpair += 1; // 170301 d'après 170224
			}
			// else if (tempsVisuel > tableauDeMomentsDsEvImpairs[prochainIndiceEvImpair] && tempsVisuel < tableauDeMomentsDsEvImpairs[longueurTableauDEvImpairs -1]){ 
				// if (longueurTableauDEvImpairs - 1 > prochainIndiceEvImpair){
					// prochainIndiceEvImpair += 1; // 160901, d'après réflexion agenda 160831 (jour prérentrée)
				// } // if
			// } // else if tempsVisuel interne des événements impairs
			else if (tempsVisuel > tableauDeMomentsDsEvImpairs[dernierIndiceEvImpairDsBoucleReglable] && tempsVisuel < momentVisuelSortieBoucle &&  tempsSequenceCorrige < momentSeqDernIndiceImpairAvSortieBoucle) prochainIndiceEvImpair = premierIndiceEvImpairDsBoucleReglable ; // 170301 d'après 170224 d'après 170222
			// document.getElementById("demo_12").innerHTML = "prochain Indice d'événement impair: " + prochainIndiceEvImpair ; // 170210
			
			// Réglage des prochains moments des événements
			// Détermination zone retour de boucle. // 170226: peut-être faire fonction car déjà utile plus haut.
			var zoneRetourTEv; // 170226
			if (tempsVisuel > tableauDeMomentsDsEv[dernierIndiceEvDsBoucleReglable - 1] && tempsSequenceCorrige < momentSortieDeBoucle) zoneRetourTEv = true; 
			else zoneRetourTEv = false;
			//document.getElementById("demo_6").innerHTML = "zoneRetourTEv: " + zoneRetourTEv ; // 170226: test OK
			
			// if (tempsVisuel < tableauDeMomentsDsEv [longueurTableauDEv - 1]){
				// prochainEvenementDans = tableauDeMomentsDsEv [prochainIndiceEv] - tempsVisuel; // 160902, 170202: validé avec tempsVisuel
			// }else{
				// prochainEvenementDans = dureeVisuel - tempsVisuel + tableauDeMomentsDsEv [premierIndiceEvDsBoucleReglable] - momentDepartBoucleAlt; // 170202 d'après 160902 (même raisonnement que 141224 sur Flash)
			// } // 170202: dureeVisuel substitué à dureeBoucle, tempsVisuel substitué à tempsBoucle, tableauDeMomentsDsEv [premierIndiceEvDsBoucleReglable] - momentDepartBoucleAlt substitué à tableauDeMomentsDsEv [0]
			
			if (zoneRetourTEv == true){ // 170304 d'après 170228
				prochainEvenementDans = momentVisuelSortieBoucle - tempsVisuel + tableauDeMomentsDsEv [premierIndiceEvDsBoucleReglable] - momentDepartBoucleAlt;
			}
			else prochainEvenementDans = tableauDeMomentsDsEv[prochainIndiceEv] - tempsVisuel; // 170304 d'après 170228
			
			var prochainEvenementDansArrondi = Math.floor(prochainEvenementDans);
			
			// prochains moments des événements pairs 160911
			var zoneRetourTEvP; // 170226
			if (tempsVisuel > tableauDeMomentsDsEvPairs[dernierIndiceEvPairDsBoucleReglable] && tempsSequenceCorrige < (momentSortieDeBoucle - dureeVisuelleBoucle)) zoneRetourTEvP = true; 
			else zoneRetourTEvP = false;
			//document.getElementById("demo_6").innerHTML = "zoneRetourTEvPairs: " + zoneRetourTEvP ; // 170226: test OK
			
			// if (tempsVisuel < tableauDeMomentsDsEvPairs [longueurTableauDEvPairs - 1]){
				// prochainEvenementPairDans = tableauDeMomentsDsEvPairs [prochainIndiceEvPair] - tempsVisuel; // 160911 d'après 160902
			// }else{
				// prochainEvenementPairDans = dureeVisuel - tempsVisuel + tableauDeMomentsDsEvPairs [premierIndiceEvPairDsBoucleReglable] - momentDepartBoucleAlt; // 170203 d'après 160911 d'après 160902 (même raisonnement que 141224 sur Flash)
			// }
			
			if (zoneRetourTEvP == true){ // 170228
				prochainEvenementPairDans = momentVisuelSortieBoucle - tempsVisuel + tableauDeMomentsDsEvPairs [premierIndiceEvPairDsBoucleReglable] - momentDepartBoucleAlt;
			}
			else prochainEvenementPairDans = tableauDeMomentsDsEvPairs[prochainIndiceEvPair] - tempsVisuel; // 170228
			
			var prochainEvenementPairDansArrondi = Math.floor(prochainEvenementPairDans);
			
			// prochains moments des événements impairs 160911
			var zoneRetourTEvImp; // 170226 : pas encore en fonction manque la variable dernierIndiceEvImpairDsBoucleReglable à définir plus haut.
			if (tempsVisuel > tableauDeMomentsDsEvImpairs[dernierIndiceEvImpairDsBoucleReglable] && tempsSequenceCorrige < momentSortieDeBoucle) zoneRetourTEvImp = true; 
			else zoneRetourTEvImp = false;
			// document.getElementById("demo_6").innerHTML = "zoneRetourTEvImpairs: " + zoneRetourTEvImp ; // 170226: test OK
			// if (tempsVisuel < tableauDeMomentsDsEvImpairs [longueurTableauDEvImpairs - 1]){
				// prochainEvenementImpairDans = tableauDeMomentsDsEvImpairs [prochainIndiceEvImpair] - tempsVisuel; // 160911 d'après 160902
			// }else{
				// prochainEvenementImpairDans = dureeBoucle - tempsVisuel + tableauDeMomentsDsEvImpairs [0]; // 160911 d'après 160902 (même raisonnement que 141224 sur Flash)
			// }
			
			if (zoneRetourTEvImp == true){ // 170301 d'après 170228
				prochainEvenementImpairDans = momentVisuelSortieBoucle - tempsVisuel + tableauDeMomentsDsEvImpairs [premierIndiceEvImpairDsBoucleReglable] - momentDepartBoucleAlt;
			}
			else prochainEvenementImpairDans = tableauDeMomentsDsEvImpairs[prochainIndiceEvImpair] - tempsVisuel; // 170228
			
			var prochainEvenementImpairDansArrondi = Math.floor(prochainEvenementImpairDans);
			// test 1609110907: OK, impression code à ce stade
			
			noDivProchEv = tableauDEvenements [prochainIndiceEv]; // 160906
			
			if (noDivProchEv/2 == Math.floor(noDivProchEv/2)){
				divPrEvPaire = true; // 160907
			} else{
				divPrEvPaire = false; // 160907
			}
			
			// document.getElementById("demo_5").innerHTML = "PTà: " + Math.floor(prochainTemps - (8*dureeTemps)) + ", TBoucle " + Math.floor(tempsVisuel) + ", PremEv: " + Math.floor(premierEvenementA) + ", PremEvP: " + Math.floor(premierEvenementPairA) + ", PremEvImp: " + Math.floor(premierEvenementImpairA) + ", ProchEvNo: " + prochainIndiceEv + ", ProchEvDs: " + prochainEvenementDansArrondi + ", ProchIndicePair: " + prochainIndiceEvPair + ", ProchEvPairDs: " + prochainEvenementPairDansArrondi + ", ProchEvImpairDs: " + prochainEvenementImpairDansArrondi;
			var prochainTempsDans;
			prochainTempsDans = prochainTemps - tempsSequenceAbs;
			
			var prochainTempsDansArrondi;
			prochainTempsDansArrondi = Math.floor(prochainTempsDans);
			
			// document.getElementById("demo_6").innerHTML = prochainTempsDansArrondi; // 160625
			
			// *** JOUER LES SONS (au 160625: simple métronome charley, 160903 et 04: raccord des sons OK)
			
			var pisteChF = document.querySelector('#CharleyF');
			var pisteChF_Pair = document.querySelector('#CharleyF_Pair');
			var pisteChF_Imp = document.querySelector('#CharleyF_Imp'); // 160908
			var pisteCClaire = document.querySelector('#CClaire'); // 160707: un 2ème son pour le décompte.
			var pisteCClaire_Imp = document.querySelector('#CClaire_Imp');
			var pistePied = document.querySelector('#Pied'); // 160903
			var pistePied_Imp = document.querySelector('#Pied_Imp');
			
			var tableauDeSonsPairs = [pistePied, pisteCClaire, pisteChF_Pair]; // 160903
			var tableauDeSonsImpairs = [pistePied_Imp, pisteCClaire_Imp, pisteChF_Imp]; // 160903
			
			var dureeCourse, numeroDeTempsSequenceCor, nombreTempsDecompte; // 160827: ajout du numeroDeTempsSequenceCor
							
			if (decompte){ // 160827
				nombreTempsDecompte = nbreTempsPMesure * nbreMesureDecompte; // 161210: généralisation
			}else{
				nombreTempsDecompte = 0;
			}
			
			numeroDeTempsSequenceCor = numeroDeTempsSequenceAbs - nombreTempsDecompte;
			
			metronome = activerMetronome(); // 161203
			
			//if (metronome == true){ // 161104
				if(premierTemps == false){
					if (metronome == true){ // 161206 d'après 161104, placé ici pour découplage métronome/décompte
					pisteChF.currentTime = 0.1; 
					pisteChF.play();
					}
					if (decompte){ // 160827: ajout de cette clause
						pisteCClaire.currentTime = 0.1; 
						pisteCClaire.play(); // 161206: Relecture et explication: 1er temps du décompte joué à la caisse claire équivaut à 0: d'où 0 (ici), 2 (= 3è temps du décompte), 4, 5, 6, 7 (tps 1 à 4 2è mesure)
					}
				
					var tempsJeuPremierTemps;
					tempsJeuPremierTemps = tempsSequenceAbs;
					// document.getElementById("demo_11").innerHTML = tempsJeuPremierTemps;
					premierTemps = true;
				}
			
				if (prochainTempsDans < 90 && dejaJoueTemps == false){ // 161206: commentaire, jeu du métronome
					//pisteCClaire.pause();
				
					dureeCourse = (100 - prochainTempsDansArrondi)*0.001; // 160629: 100 est le fruit d'un réglage, 250 tombe après le signal. La latence est plus grande en JS qu'en AS3. Chrome est bien, Firefox dégueu quel que soit le réglage.
					if (metronome == true){ // 161206 d'après 161104
						if (numeroDeTempsSequenceCor>=0){ //160827: rajout de la clause // 160828, attention, >=  ald > sinon il manque un temps.
							pisteChF.currentTime = dureeCourse; // 160629: Albertine 25 ans: rajouté currentTime ici, car ce n'est pas Flash, il n'y a pas d'argument à la fonction play, fonctionne bien avec Chrome
							pisteChF.play();					// IE nickel... jusqu'à 400 soit double à 100
						}
					}
					if (decompte){ // 160827: ajout de cette clause
						//nbreTempsPMesure //
						var tabTpsJouesDsDecompte = new Array(); // 170110
						tabTpsJouesDsDecompte = jouerUnTempsS2DsDecompte();
						var longueurtabTpsJouesDsDecompte;
						longueurtabTpsJouesDsDecompte = tabTpsJouesDsDecompte.length;
						// if (permAlert){
							// alert(longueurtabTpsJoues1s2);
							// permAlert = false;
						// }
						// 170106, schéma: for i < tabTpsJoues1s2 if noTpsSeqAbs == tab [i]	pCC.play
						for (var d = 1; d < longueurtabTpsJouesDsDecompte; d++){ // 170110
							if(numeroDeTempsSequenceAbs == tabTpsJouesDsDecompte [d] /*2 || numeroDeTempsSequenceAbs== 4 ||numeroDeTempsSequenceAbs== 5 ||numeroDeTempsSequenceAbs== 6 ||numeroDeTempsSequenceAbs== 7*/){
								pisteCClaire.currentTime = dureeCourse; // 160707: décompte 4/4 2 mesures
								pisteCClaire.play();
							} // if
						} // for
					} // if decompte
				
					// document.getElementById("demo_7").innerHTML = dureeCourse; // 160625
					// document.getElementById("demo_10").innerHTML = pisteChF.currentTime; // 160625
				
					dejaJoueTemps = true;
				} else if (prochainTempsDans >= 90){
					//pisteCClaire.pause();
					//pisteCClaire.currentTime = 0;
					dejaJoueTemps = false;
				} // prochainTempsDans
			//} // if metronome
			
			var longueurTableauDPistesPEv, longueurTableauDPistesPEvPair, longueurTableauDPistesPEvImpair, dureeCoursePrSonPair, dureeCoursePrSonImpair; // 160903, 160906, 160907
			if (tableauDEvenements.length != 0){ // ajout clause 160906
				longueurTableauDPistesPEv = tableauDePistesPEvenement[prochainIndiceEv].length; // 160903
			}
			
			if (tableauDEvenementsPairs.length != 0){ // 160916 d'après ajout clause 160906
				longueurTableauDPistesPEvPair = tableauDePistesPEvenementsPairs[prochainIndiceEvPair].length; // 160916 d'après 160903
			}
			
			if (tableauDEvenementsImpairs.length != 0){ // ajout clause 160906
				longueurTableauDPistesPEvImpair = tableauDePistesPEvenementsImpairs[prochainIndiceEvImpair].length; // 160916 d'après 160903
			}
			
			// document.getElementById("demo_14").innerHTML = "noDivProchEv: "+ noDivProchEv + " / pariteProchEv ?: "+ divPrEvPaire;
			
			if (tableauDEvenementsPairs[0] == 0 && tempsSequenceAbs < 50){ // 161110: cas cellule 0 sélectionnée avant le départ
				//dureeCoursePrSonPair = 0; // 161110 d'après 160916 d'après 160908, d'après 160903 d'après 160629
				if (dejaJoueSonsPairs == false){
					for (var iz=0; iz< longueurTableauDPistesPEvPair; iz++){
						dureeCoursePrSonPair = (100 + tempsSequenceAbs)*0.001; //  161115 d'après 160916 d'après 160908, d'après 160903 d'après 160629
						tableauDeSonsPairs [tableauDePistesPEvenementsPairs[prochainIndiceEvPair][iz]].currentTime = dureeCoursePrSonPair; //160916 d'après 160903, 160906, 160908
						tableauDeSonsPairs [tableauDePistesPEvenementsPairs[prochainIndiceEvPair][iz]].play();
					} // for iz
						dejaJoueSonsPairs = true;
			}
			}
			
			if (prochainEvenementPairDansArrondi < 90){
				// if (divPrEvPaire){
				if (dejaJoueSonsPairs == false){
					dureeCoursePrSonPair = (100 - prochainEvenementPairDansArrondi)*0.001; //  160916 d'après 160908, d'après 160903 d'après 160629
					for (var ip=0; ip< longueurTableauDPistesPEvPair; ip++){
						tableauDeSonsPairs [tableauDePistesPEvenementsPairs[prochainIndiceEvPair][ip]].currentTime = dureeCoursePrSonPair; //160916 d'après 160903, 160906, 160908
						tableauDeSonsPairs [tableauDePistesPEvenementsPairs[prochainIndiceEvPair][ip]].play();
					} // for i
						dejaJoueSonsPairs = true;
				} // if false
			} // if prochainEvDsAr
			else if (prochainEvenementPairDansArrondi >= 90){
				dejaJoueSonsPairs = false;
			} // else if // 160903
			
			if (prochainEvenementImpairDansArrondi < 90){
				// if (divPrEvPaire){
					if (dejaJoueSonsImpairs == false){
						dureeCoursePrSonImpair = (100 - prochainEvenementImpairDansArrondi)*0.001; //  160916 d'après 160908, d'après 160903 d'après 160629
						for (var ii=0; ii< longueurTableauDPistesPEvImpair; ii++){
							tableauDeSonsImpairs [tableauDePistesPEvenementsImpairs[prochainIndiceEvImpair][ii]].currentTime = dureeCoursePrSonImpair; //160916 d'après 160903, 160906, 160908
							tableauDeSonsImpairs [tableauDePistesPEvenementsImpairs[prochainIndiceEvImpair][ii]].play();
						} // for i
						dejaJoueSonsImpairs = true;
					} // if false
			} // if prochainEvDsAr
			else if (prochainEvenementImpairDansArrondi >= 90){
				dejaJoueSonsImpairs = false;
			} // else if // 160903
			if (tempsSequenceCorrige > dureeSequence){
				marche = false; // 170305
				document.getElementById("boutonDemAr").innerHTML = "Démarrer";
			}
		}else{ // => marche == false
			premierTemps = false;
			prochainIndiceEv = 0; // 160901
			posXCurseur = 110; // 161001
			// document.getElementById("horiz").value = 0; // 161001 d'après 160824-25
		} // if marche == true
		
		var messagePos = 'Position du Curseur: ' + Math.floor(posXCurseur);
		
		//ecrireMessagePos(canvas, messagePos); // Passé en commentaire 180219 pour 1ère publication mais plus tard faire afficher position en mesure, temps, div dans la boucle.
		ecrireMessageSec(canvas, messageSec);
		
		window.requestAnimationFrame(function() { animerCurseur(posXCurseur) });
	
	}

	 animerCurseur(110);

 }); // fin window fonction porteuse de l'écouteur du canvas et contenant des fonctions, ouverte à "Gestion du canvas" (161012, l.139)