// var selectionne = false;

var nbreTouchesBlanches = 12; // 170908
var nbreTouchesNoires = 8; // 170925
var nbreTouches; // 170926
nbreTouches = nbreTouchesBlanches + nbreTouchesNoires;

// *** TABLEAU DES SONS DU CLAVIER *** 170907: ouv. feu.
	
var T_C2 = document.querySelector('#P_C2');
var T_Cd2 = document.querySelector('#P_Cd2'); 
var T_D2 = document.querySelector('#P_D2');
var T_Dd2 = document.querySelector('#P_Dd2');
var T_E2 = document.querySelector('#P_E2');
var T_F2 = document.querySelector('#P_F2');
var T_Fd2 = document.querySelector('#P_Fd2');
var T_G2 = document.querySelector('#P_G2');
var T_Gd2 = document.querySelector('#P_Gd2');
var T_A2 = document.querySelector('#P_A2');
var T_Ad2 = document.querySelector('#P_Ad2');
var T_B2 = document.querySelector('#P_B2');
var T_C3 = document.querySelector('#P_C3');
var T_Cd3 = document.querySelector('#P_Cd3');
var T_D3 = document.querySelector('#P_D3');
var T_Dd3 = document.querySelector('#P_Dd3');
var T_E3 = document.querySelector('#P_E3');
var T_F3 = document.querySelector('#P_F3');
var T_Fd3 = document.querySelector('#P_Fd3');
var T_G3 = document.querySelector('#P_G3'); 
//var sonsClavier = [T_C2, T_D2, T_E2, T_F2, T_G2, T_A2, T_B2, T_C3, T_D3, T_E3, T_F3, T_G3];
var sonsClavier = [T_C2, T_Cd2, T_D2, T_Dd2, T_E2, T_F2, T_Fd2, T_G2, T_Gd2, T_A2, T_Ad2, T_B2, T_C3, T_Cd3, T_D3, T_Dd3, T_E3, T_F3, T_Fd3, T_G3];
var sonsTouchesBlanches = [T_C2, T_D2, T_E2, T_F2, T_G2, T_A2, T_B2, T_C3, T_D3, T_E3, T_F3, T_G3]; // 171010: réduction
var sonsTouchesNoires = [T_Cd2, T_Dd2, T_Fd2, T_Gd2, T_Ad2, T_Cd3, T_Dd3, T_Fd3]; // 171013

// *** TABLEAU DES TOUCHES DE L'ORDINATEUR ***

var codeTouchesBlanches = [81, 83, 68, 70, 71, 72, 74, 75, 76, 77, 192, 220]; // voir ReactiviteClavier_02.html
var codeTouchesNoires = [90, 69, 84, 89, 85, 79, 80, 186];
var codeTouches = [81, 90, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75, 79, 76, 80, 77, 192, 186, 220];
// 192, 220 fa sol aigus Chrome et IE; 165, 170: Firefox

// *** TABLEAU D'ETAT DE SELECTION DES TOUCHES ***

var etatSelectionTouches = [false, false, false, false, false, false, false, false, false, false, false, false];  // 170908: ne sert pas pour le moment. Servira lors d'opérations mixtes souris/clavier
var zone = []; // 170926
for (var i = 0; i < nbreTouches; i++){
	zone[i] = false;
}

function activerZone (posXPointeur, posYPointeur){ // 170926
	if (posXPointeur > 60 && (posYPointeur > 70 && posYPointeur <= 195 && posXPointeur < 74) || (posYPointeur > 195 && posYPointeur < 274 && posXPointeur < 93)){
		zone[0] = true;
	} else zone[0] = false;
}

// SELECTEUR, MODELE DESSIN
	// var posXCell, posYCell, couleurFondCell, CouleurTourCell;
	
	// function dessinerCellule(posXCell, posYCell, couleurFondCell, couleurTourCell){
		// context.beginPath();

		// context.moveTo(114+posXCell, 370-posYCell); //  coin nord-ouest : j'ai ajouté posXCellule = 70
		
		// context.lineTo(121+posXCell, 370-posYCell); // coin nord-est
		// context.quadraticCurveTo(125+posXCell, 370-posYCell, 125+posXCell, 374-posYCell); // vers façade est
		// context.lineTo(125+posXCell, 386-posYCell); //façade est
		// context.quadraticCurveTo(125+posXCell, 390-posYCell, 121+posXCell, 390-posYCell); //vers plancher sud
		// context.lineTo(114+posXCell, 390-posYCell); // plancher sud
		// context.quadraticCurveTo(110+posXCell, 390-posYCell, 110+posXCell, 386-posYCell); // vers façade ouest
		// context.lineTo(110+posXCell, 374-posYCell); // vers plafond nord
		// context.quadraticCurveTo(110+posXCell, 370-posYCell, 114+posXCell, 370-posYTouche);
		
		// context.closePath();
		// context.fillStyle = couleurFondCell;
		// context.fill();
		// context.strokeStyle = couleurTourCell;
		// context.stroke();
	// }

// DESSIN DES TOUCHES // Début 170810: Figueres

var posXTouche, largeurTouche, longueurTouche, couleurFondTouche, CouleurTourTouche;
//largeurTouche = 32; // 170922
//longueurTouche = 200;


function dessinerTouche(largeurTouche, longueurTouche, posXTouche, couleurFondTouche, CouleurTourTouche){
	//var canvas = document.getElementById('canvas');
	//var context = canvas.getContext('2d');
	var posXInitPlusLargeurT = 60 + largeurTouche; // 170923: touche blanche = 60 + 32 = 92
	var posYInitPlusLongueurT = 70 + longueurTouche; // 170924
	context.beginPath();
	context.moveTo(60 + posXTouche, 70); //  coin nord-ouest : j'ai ajouté posXCellule = 70
		
	context.lineTo(posXInitPlusLargeurT + posXTouche, 70); // façade nord, 170919: remplacer 92 par 60 + largeurTouche, + même principe pour les longueurs
	
	//context.quadraticCurveTo(150+posXTouche, 70-posYTouche, 150+posXTouche, 74-posYTouche); // coin nord-est
	context.lineTo(posXInitPlusLargeurT + posXTouche, posYInitPlusLongueurT); //façade est
	context.quadraticCurveTo(posXInitPlusLargeurT + posXTouche, posYInitPlusLongueurT + 4, posXInitPlusLargeurT - 4 + posXTouche, posYInitPlusLongueurT + 4); //coin sud-est
	context.lineTo(64 + posXTouche, posYInitPlusLongueurT + 4); // plancher sud
	context.quadraticCurveTo(60 + posXTouche, posYInitPlusLongueurT + 4, 60 + posXTouche, posYInitPlusLongueurT); // coin sud-ouest
	context.lineTo(60 + posXTouche, 70); // façade ouest
	//context.quadraticCurveTo(110+posXTouche, 70-posYTouche, 114+posXTouche, 70-posYTouche); // coin nord-ouest
	
	context.closePath();
	context.stroke();
	
	context.fillStyle = couleurFondTouche;
	context.fill();
	
	// context.lineWidth = 2;
	// context.strokeStyle = couleurTourTouche;
	//ecrireNomDeNote(canvas, 'Do', posXTouche+ 3);
}

// function dessinerClavier(){ // 170924
	
// }
// 0, 33, 66, 99, 132, 165, 198, 231, 264, 297, 330, 363 : positions touches blanches
var posXTouchesNoires = [23, 60, 122, 158, 192, 254, 291, 353];
var posXToutesTouches = [0, 23, 38, 60, 75, 99, 122, 137, 158, 173, 192, 207, 231, 254, 269, 291, 306, 330, 353, 368]; // 170928: ai préféré le dessin empirique au dessin mathématique qui fait une touche noire trop large.
var toucheNoireSelect = [false, false, false, false, false, false, false, false]; // 170929

function dessinerTouchesNoires(){ // 170926
	for (var i = 0; i < nbreTouchesNoires; i++){ // 170925
		dessinerTouche(14, 125, posXTouchesNoires [i],"black", "black");
	}
}	
	
function ecrireMessage(canvas, message) {
	var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height); // efface sur toute la surface du canvas les précédentes inscriptions
    context.font = '18pt Calibri';
    context.fillStyle = 'grey';
    context.fillText(message, 10, 25);
}

function ecrireNomDeNote(canvas, nomDeNote, posXNom) {
	var context = canvas.getContext('2d');
	context.font = '12pt Calibri';
	context.fillText(nomDeNote, posXNom, 250); // 180202
}

function marquer(canvas, marque) {
	var context = canvas.getContext('2d');
	context.clearRect(0, 370, canvas.width, canvas.height); 
	context.font = '11pt Calibri';
	context.fillStyle = 'grey';
	context.fillText(marque, 10, 380); // 180204
}
      
function positionnerPointeur(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
	};
}
      
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

window.addEventListener('load', dessinerInitial, false);
function dessinerInitial(evt) {
	
	for (var i = 0; i < nbreTouchesBlanches; i++){
		// dessinerTouche(0,0,"white", "black");
		dessinerTouche(32, 200, 33*i,"white", "black");
	}
	// 
	dessinerTouchesNoires(); // 170926
	//var nomDeNote = 'Do'
	// ecrireNomDeNote(canvas, 'Do', 66); // 180202
	var marque = '© monsieur magnard 2017-2018'
	marquer(canvas, marque); // 180204
	// dessinerTouche(14, 125, 23, "black", "black"); // 170924: 1ères touches noires
	// dessinerTouche(14, 125, 59, "black", "black");
}

canvas.addEventListener('mousedown', cliquerSur, false); 
function cliquerSur(evt){ // 170801 Paris d'après 160531: modèle: mousemove
	var positionPointeur = positionnerPointeur(canvas, evt);
	activerZone (positionPointeur.x, positionPointeur.y);
    var message = 'Position du pointeur: ' + positionPointeur.x + ',' + positionPointeur.y + ' zone0: ' + zone[0]; 
	//ecrireMessage(canvas, message); // réformé pour publication 180206
	dessinerInitial();
	
	if (positionPointeur.y > 70 && positionPointeur.y < 195){ // Partie sup du clavier.
		for (var i = 0; i < nbreTouches -1; i++){ // 170928: projet en commentaire pour le moment, cf. agenda 170929
			var noToucheBlanche = Math.ceil((i%12)/2) + 7 * Math.floor(i/12);
			var noToucheNoire = (Math.ceil((i%12)/2) + 5 * Math.floor(i/12)) - 1; // 171007
			//if ( i < nbreTouches - 1){
				if (positionPointeur.x > 60 + posXToutesTouches [i] && positionPointeur.x < 60 + posXToutesTouches [i+1]){
					sonsClavier[i].play();
					if (i == 10) sonsClavier[10].play(); // 180207: contrefort Github refus de jouer si b
					if ((i % 12 < 5 && i % 2 == 0) || (i % 12 >= 5 && i % 2 == 1)) { // 170929: définition des touches blanches
							dessinerTouche(32, 200, 33*noToucheBlanche,"gray", "black");
							dessinerTouchesNoires(); 
							for (var j = 0; j < nbreTouchesNoires ; j++){
								if (toucheNoireSelect [j] == true) dessinerTouche(14, 125, posXTouchesNoires [j],"gray", "black");
							} // for j
					} else if ((i % 12 < 5 && i % 2 == 1) || (i % 12 >= 5 && i % 2 == 0)) {
						dessinerTouche(14, 125, posXToutesTouches [i],"gray", "black"); // if i %
						toucheNoireSelect[noToucheNoire] = true;
					}
				} // if positionPointeur.x
			} // for i
			if (positionPointeur.x > 428 && positionPointeur.x < 452){ // sol aigu i == nTB - 1
				sonsClavier[19].play();
				dessinerTouche(32, 200, 33*11,"gray", "black");
				// dessinerTouchesNoires(); 
				// for (var k = 0; k < nbreTouchesNoires ; k++){
				if (toucheNoireSelect [7] == true) dessinerTouche(14, 125, 353,"gray", "black");
				else dessinerTouche(14, 125, 353,"black", "black");
				// } // for k
			 } // if i < nT - 1
		
	} // if positionPointeur.y	// 
	else if (positionPointeur.y >= 195 && positionPointeur.y < 274){ // 171010
		for (var k = 0; k < nbreTouchesBlanches; k++){
			if(positionPointeur.x > 60 + 33*k  &&  positionPointeur.x < 92 + 33*k){
				sonsTouchesBlanches[k].play(); // 171010
				dessinerTouche(32, 200, 33*k,"gray", "black");
				dessinerTouchesNoires(); // 171010: pour le moment on laisse comme ça, sinon, quand autres fonctions rédigées on traitera les touches noires encore résonnantes
				for (var n = 0; n < nbreTouchesNoires ; n++){
					if (toucheNoireSelect [n] == true) dessinerTouche(14, 125, posXTouchesNoires [n],"gray", "black");
				} // for n
			} // if posPt.x
		} // for k
	} // else if posPointeur.y >=
} // F cliquerSur	

canvas.addEventListener('mouseup', releverClic, false); 
function releverClic(evt){ // 170809 St Clément de Rivière d'après 160531: modèle: mousemove
	var positionPointeur = positionnerPointeur(canvas, evt);
    //var message = 'Position du pointeur: ' + positionPointeur.x + ',' + positionPointeur.y;
	//var selectionne = false;
	//var T_C2 = document.querySelector('#P_C2');
	//ecrireMessage(canvas, message);
	if( positionPointeur.y >= 195 && positionPointeur.y < 274){
	for (var i = 0; i < nbreTouchesBlanches; i++){	
		if(positionPointeur.x > 60 + 33*i  &&  positionPointeur.x < 92 + 33*i){
			//context.fillStyle = "red";
			//context.fillRect(0, 50, 50, 80); //170801 d'après 160603: affiche un rectangle jaune au click aux coordonnées de la souris.
			sonsTouchesBlanches[i].pause();
			sonsTouchesBlanches[i].currentTime = 0;
			// dessinerTouche(0,0,"white", "black");
			// dessinerTouche(33,0,"white", "black");
			dessinerTouche(32, 200, 33*i,"white", "black");
			dessinerTouchesNoires();
			for (var n = 0; n < nbreTouchesNoires ; n++){ // 171011
					if (toucheNoireSelect [n] == true) dessinerTouche(14, 125, posXTouchesNoires [n],"gray", "black");
				} // for n
			//dessinerInitial();
		//selectionne = false;
			}// if pP.x // else{
			//context.clearRect((0, 50, 50, 80);
			// selectionne = false;
		 //}
		 //alert(selectionne);
		} // for i
	} // if pP.y >=
	 else if (positionPointeur.y > 70 && positionPointeur.y < 195){ // Partie sup du clavier.
		for (var j = 0; j < nbreTouches -1; j++){ // 170928: projet en commentaire pour le moment, cf. agenda 170929
			var noToucheBlanche = Math.ceil((j%12)/2) + 7 * Math.floor(j/12);
			var noToucheNoire = (Math.ceil((j%12)/2) + 5 * Math.floor(j/12)) - 1; // 171007
			//if ( j < nbreTouches - 1){
				if (positionPointeur.x > 60 + posXToutesTouches [j] && positionPointeur.x < 60 + posXToutesTouches [j+1]){
					sonsClavier[j].pause();
					sonsClavier[j].currentTime = 0;
					if ((j % 12 < 5 && j % 2 == 0) || (j % 12 >= 5 && j % 2 == 1)) { // 170929: définition des touches blanches
							dessinerTouche(32, 200, 33*noToucheBlanche,"white", "black");
							dessinerTouchesNoires(); 
							for (var k = 0; k < nbreTouchesNoires ; k++){
								if (toucheNoireSelect [k] == true) dessinerTouche(14, 125, posXTouchesNoires [k],"gray", "black");
							} // for k
					} else if ((j % 12 < 5 && j % 2 == 1) || (j % 12 >= 5 && j % 2 == 0)) { // définition touche noire
						dessinerTouche(14, 125, posXToutesTouches [j],"black", "black"); // if j %
						toucheNoireSelect[noToucheNoire] = false;
					} // else if j % touche Noire
				} // if positionPointeur.x
			} // for j
			if (positionPointeur.x > 428 && positionPointeur.x < 452){ // sol aigu j == nTB - 1
				sonsClavier[19].pause();
				sonsClavier[19].currentTime = 0;
				dessinerTouche(32, 200, 33*11,"white", "black");
				// dessinerTouchesNoires(); 
				// for (var k = 0; k < nbreTouchesNoires ; k++){
				if (toucheNoireSelect [7] == true) dessinerTouche(14, 125, 353,"gray", "black");
				else dessinerTouche(14, 125, 353,"black", "black");
				// } // for k
			 } // sol aigu
		} // else if pP.y < 195 // 171011
} // F releverClic

//==============
//	LES TOUCHES
//==============

window.addEventListener('keydown', appuyer, false); // 170807: St Clément de Rivière
function appuyer(e){
	
	for (var i = 0; i < nbreTouchesBlanches; i++){
		if (e.keyCode == codeTouchesBlanches[i]) {
		//var T_C2 = document.querySelector('#P_C2');
			sonsTouchesBlanches[i].play();
			dessinerTouche(32, 200, 33*i,"gray", "black"); // 170908 d'après 170825
			dessinerTouchesNoires();
			for (var k = 0; k < nbreTouchesNoires ; k++){
				if (toucheNoireSelect [k] == true) dessinerTouche(14, 125, posXTouchesNoires [k],"gray", "black");
			} // for k
		//selectionne = true;
		//clearCanvas();
		// y = y - 10;
		// canvas_context.fillRect(x, y, 50, 30);
		}
	}
	for (var j = 0; j < nbreTouchesNoires; j++){
		if (e.keyCode == codeTouchesNoires[j]) {
			sonsTouchesNoires[j].play();
			
			dessinerTouche(14, 125, posXTouchesNoires [j],"gray", "black");  // 170908 d'après 170825
			toucheNoireSelect [j] = true;
			if (toucheNoireSelect [j] == true) dessinerTouche(14, 125, posXTouchesNoires [j],"gray", "black");
		}
	}
}

// function clearCanvas() {
	// canvas.width = canvas.width;
// }

window.addEventListener('keyup', relever, false); // 170809: St Clément de Rivière
function relever(e){
	
	for (var i = 0; i < nbreTouchesBlanches; i++){
		if (e.keyCode == codeTouchesBlanches[i]) {
		//var T_C2 = document.querySelector('#P_C2');
			sonsTouchesBlanches[i].pause();
			sonsTouchesBlanches[i].currentTime = 0; // 170809
			dessinerTouche(32, 200, 33*i,"white", "black"); // 170825
			dessinerTouchesNoires();
			for (var k = 0; k < nbreTouchesNoires ; k++){
				if (toucheNoireSelect [k] == true) dessinerTouche(14, 125, posXTouchesNoires [k],"gray", "black");
			} // for k
		}
	}
	
	for (var j = 0; j < nbreTouchesNoires; j++){
		if (e.keyCode == codeTouchesNoires[j]) {
			sonsTouchesNoires[j].pause();
			sonsTouchesNoires[j].currentTime = 0;
			dessinerTouche(14, 125, posXTouchesNoires [j],"black", "black");  // 170908 d'après 170825
			toucheNoireSelect [j] = false;
		}
	}
}