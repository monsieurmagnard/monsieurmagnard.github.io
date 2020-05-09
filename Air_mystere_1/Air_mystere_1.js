
/*(function(){
	var boutonMarche = document.getElementById('valid1');
	boutonMarche.x = 120;
})();*/

var marche = false;
var zerodemande = false;
var instantDepart = 0;
var instantPause = 0;
var repositionne = false;
var repositioX = 0;

var positiondepartcurseur = 120;
var to_tab = [0, 1.82, 2.88, 4.5, 5.48, 7.1, 8, 8.68, 9.25, 9.9, 10.5, 11.8, 36.37 ]; // 200507: en secondes, array.length = 13; instruit depuis Trakax (logiciel video)
var poso_tab = [120, 142, 342, 515, 610, 779, 874, 909, 958, 997, 1055, 1100, 1129]; // 200507: en pixels positionX des objets clés. Taille tableau: 13

var video = document.querySelector('#videoplayer_1');

function demar_arret(){
	if ( marche==false){
		document.getElementById("bouton_demarre").innerHTML = "Pause";
		marche = true;
		zerodemande = false;
		instantDepart = fixer_instant_du_depart();
		document.getElementById("instant_depart").innerHTML = 'instant départ: ' + instantDepart;
	}
	else {
		document.getElementById("bouton_demarre").innerHTML = "Jouer";
		marche = false;
		instantPause = recuperer_instant_pause();
		document.getElementById("instant_pause").innerHTML = 'instant pause: ' + instantPause;
	}
	document.getElementById("etat").innerHTML = "marche: " + marche;
}

function remettre_a_zero(){
		video.pause();
		video.currentTime = 0;
		
		document.getElementById("bouton_demarre").innerHTML = "Jouer";
		zerodemande = true;
		marche = false;
		instantDepart = 0; 
		document.getElementById("initialisation").innerHTML = "initialisation ?: " + zerodemande;
		document.getElementById("etat").innerHTML = "marche: " + marche;
		document.getElementById("video_timer").innerHTML = 'video (s): ' + video.currentTime;
		document.getElementById("curseur_position").innerHTML = 'curseur (px): ' + 120;
}

function fixer_instant_du_depart(){
	
	var depart = new Date();
	var seconde_dep = depart.getSeconds();
	var milliseconde_dep = depart.getMilliseconds();
	instant_depart = 1000*seconde_dep + milliseconde_dep;
		
	return instant_depart;
}

function recuperer_instant_pause(){
	
	var pause = new Date();
	var seconde_pause = pause.getSeconds();
	var milliseconde_pause = pause.getMilliseconds();
	instant_pause = 1000*seconde_pause + milliseconde_pause;
		
	return instant_pause;
}

function calculer_mouvement (posX_d, posX_f, video_time_d, video_time_f, video_time_actuel){
	var pos_curseur = posX_d + (posX_f - posX_d) * (video_time_actuel - video_time_d) / (video_time_f - video_time_d); // 200508: correction via Python "position_curseur.py" de 200507
	return pos_curseur;
}

function calculer_temps_video (video_time_d, video_time_f, posX_d, posX_f, position_x){
	var temps_video = video_time_d + (video_time_f - video_time_d) * (position_x - posX_d) / (posX_f - posX_d); // 200508: fonction clic souris repositionne video
	return temps_video;
}

window.addEventListener('load', function() {

	var canvas  = document.querySelector('#canvas');
	var context = canvas.getContext('2d');
	
	var img = document.getElementById("airmyst1");
	context.drawImage(img, 10, 10);
	
	var posX = 120;
	
	function ecrireMessagePos(canvas, messagePos) {
        //var context = canvas.getContext('2d');
       // context.clearRect(0, 0, canvas.width, canvas.height); // efface sur toute la surface du canvas les précédentes inscriptions
        context.font = '13pt Calibri';
        context.fillStyle = 'grey';
        context.fillText(messagePos, 10, 12);
		
      }
	  
	  function ecrireMessageSec(canvas, messageSec) {
        
        context.font = '13pt Calibri';
        context.fillStyle = 'grey';
        context.fillText(messageSec, 400, 12);
		
      }
	  
	  function getMousePos(canvas, evt){  // Position x,y du pointeur
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	  
	  canvas.addEventListener('click', function(evt) { // 160531: modèle: mousemove
        var mousePos = getMousePos(canvas, evt);
        var message_position = 'position pointeur (px): ' + mousePos.x;
		var temps_video;
		
		for (var i = 0; i < 12; i++){
			if (mousePos.x >= poso_tab[i] && mousePos.x < poso_tab[i + 1] ){
				temps_video = calculer_temps_video(to_tab[i], to_tab[i+1], poso_tab[i], poso_tab[i+1], mousePos.x); // 200508
			}
		}
		var message_temps_video = 'temps video (s): ' + temps_video;
		
		document.getElementById("pointeur_position").innerHTML = message_position + ' ; ' + message_temps_video;

		video.currentTime = temps_video;
		repositionne = true;
		repositioX = mousePos.x;

	  }, false); // fin fonction click sélection (à ne pas oublier!: 200504)
	
	function curseur(posX) { // 160616: draw sur le modèle, le nom de fonction est peut-être important, test: NON, curseur ou chien ou chat vont aussi bien.
	
		context.save();
		context.clearRect(0, 0, 1130, 220);
		context.drawImage(img, 10, 10); // image de la partition
		
		context.strokeStyle = "rgba(23, 145, 167, 0.8)";
		context.beginPath();
		context.moveTo(posX, 10);  // 1er point (x, y)
		context.lineTo(posX, 205); // 2e point
		context.stroke(); // 160616, obligatoire sinon pas dessiné.
		
		context.restore();
		
		if (marche == true){
			//var img = document.getElementById("airmyst1");
			video.play(); // 200502
			var tx = video.currentTime;
			var apresvirgule = Math.floor((tx - Math.floor(tx))*1000);
			document.getElementById("video_timer").innerHTML = 'video (s): ' + Math.floor(tx) + ',' + apresvirgule ;
			
			/*if (posX < 148 && video.currentTime < 3) posX = 120 + (14 * video.currentTime ); // 200506 en substitution de 200504: durée moyenne frame (rafraichisement canvas) un peu sup à 17 ms (chrome) cf. moyenne dans bloc program
										  // => longueur frame (posX +=) = distance interrepères x durée frame (~17 ms)/ durée interrepères.
			else if (posX >= 148 && posX < 345) posX+= 3.3; // sol m.2
			else if (posX >= 345 && posX < 518) posX+= 2; // do m.3
			else if (posX >= 518 && posX < 782) posX+= 1.8; // do m.5
			else if (posX >= 782 && posX < 876) posX+= 1.3; // sol m.6
			else if (posX >= 876 && posX < 910) posX+= 1.2; // mi m.6
			else if (posX >= 910 && posX < 959) posX+= 1.3; // do m.7
			else if (posX >= 959 && posX < 1000) posX+= 1.4; // mi m.7
			else if (posX >= 1000 && posX < 1055) posX+= 1.3; // ré m.8
			else if (posX >= 1055 && posX < 1100) posX+= 0.6; // double barre
			else if (posX >= 1100 && posX < 1114) posX+= 0.01; // fin canvas
			else if (posX >= 1114) posX = 120;*/
			
			for (var i = 0; i < 12; i++){
				if (tx >= to_tab[i] && tx < to_tab[i + 1] ){
					posX = calculer_mouvement(poso_tab[i], poso_tab[i+1], to_tab[i], to_tab[i+1], tx); // 200508 correc de 200507
				}
			}
			//else if (video.currentTime >= 0.0 && video.currentTime < 1.0 ) posX = 120;
			
			//if (posX >= 1128) posX = 120;
			//document.write(posX);
			
			var date = new Date();
			var millisecondes = date.getMilliseconds();
			var secondes = date.getSeconds();
			var instant = millisecondes + (1000 * secondes);
			//var instantDepart = fixer_instant_du_depart();
			var temps = instant - instantDepart; 
		
			var messageSec = 'Temps (s): ' + Math.floor(temps)/1000 /*+ ',' + (temps - Math.floor(temps/1000))*/; // 200505
			var messagePos = 'Position du curseur: ' + Math.floor(posX);
		
			ecrireMessagePos(canvas, messagePos);
			//ecrireMessageSec(canvas, messageSec);
			
			/*if (posX == 620){
				document.getElementById("detection_vitesse").innerHTML = temps;
			}*/ 
			
			
			document.getElementById("curseur_position").innerHTML = 'curseur (px): ' + Math.floor(posX);
		} // fin if marche true
		
		else {
			video.pause(); // 2001202
			//posX = 120;
		}
		
		if 	(zerodemande == true) posX = 120;
		if (repositionne == true) {
			posX = repositioX;
			repositionne = false;
		}
		
		
		window.requestAnimationFrame(function() { curseur(posX) });
	
	}

	 curseur(120);
 });


// window.addEventListener('load', function() { // 160616: modèle d'animation source canvas openclassrooms

    // var canvas  = document.querySelector('#canvas');
	// var context = canvas.getContext('2d');

	// function draw(angle) {

        // context.save();
		
		// context.clearRect(0, 0, 1120, 1120);
		// context.translate(75,75);
		
		// context.fillStyle = "teal";
		// context.rotate((Math.PI / 180) * (45 + angle));
		// context.fillRect(0, 0, 120, 120);

		// context.fillStyle = "orange";
		// context.rotate(Math.PI / 2);
		// context.fillRect(0, 0, 120, 120);
		
		// context.fillStyle = "teal";
		// context.rotate(Math.PI / 2);
		// context.fillRect(0, 0, 120, 120);

		// context.fillStyle = "orange";
		// context.rotate(Math.PI / 2);
		// context.fillRect(0, 0, 120, 120);

		// context.restore();
		// angle = angle + 2;

		// if (angle >= 360) angle = 0;

	// window.requestAnimationFrame(function() { draw(angle) });

    // }

	// draw(0);
// });
 