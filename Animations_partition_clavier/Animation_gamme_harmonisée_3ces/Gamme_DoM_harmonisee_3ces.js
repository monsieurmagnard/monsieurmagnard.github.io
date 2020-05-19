
/*(function(){
	var boutonMarche = document.getElementById('valid1');
	boutonMarche.x = 55;
})();*/

var marche = false;
var zerodemande = false;
var instantDepart = 0;
var instantPause = 0;
var repositionne = false;
var repositioX = 0;

var positiondepartcurseur = 55;
var to_tab =  [0, 0.8, 1.8, 2.5, 3.4, 4.5, 5.5, 6.5, 7.5, 8.5, 9.6, 10.6, 11.5, 12.7 , 13.8, 14.5, 16.5 ]; // 200507: en secondes, array.length = 13; instruit depuis Trakax (logiciel video)
var poso_tab = [55, 84, 162, 224, 286, 348, 411, 472, 527, 660, 720, 782, 843, 907, 969, 1045, 1090]; // 200507: en pixels positionX des objets clés. Taille tableau: 13

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
		momentPause = instantPause - instantDepart;
		document.getElementById("instant_pause").innerHTML = 'moment pause (s): ' + momentPause/1000;
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
		document.getElementById("curseur_position").innerHTML = 'curseur (px): ' + 55;
}

function fixer_instant_du_depart(){
	
	var depart = new Date();
	var heure_dep = depart.getHours();
	var seconde_dep = depart.getSeconds();
	var milliseconde_dep = depart.getMilliseconds();
	instant_depart = 3600000*heure_dep +1000*seconde_dep + milliseconde_dep;
		
	return instant_depart;
}

function recuperer_instant_pause(){
	
	var pause = new Date();
	var heure_pause = pause.getHours();
	var seconde_pause = pause.getSeconds();
	var milliseconde_pause = pause.getMilliseconds();
	instant_pause = 3600000*heure_pause + 1000*seconde_pause + milliseconde_pause;
		
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
	
	var img = document.getElementById("partition");
	context.drawImage(img, 10, 10);
	
	var posX = 55;
	
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
        var message_position = 'position pointeur (px): ' + Math.floor(mousePos.x);
		var temps_video;
		
		for (var i = 0; i < 16; i++){
			if (mousePos.x >= poso_tab[i] && mousePos.x < poso_tab[i + 1] ){
				temps_video = calculer_temps_video(to_tab[i], to_tab[i+1], poso_tab[i], poso_tab[i+1], mousePos.x); // 200508
			}
		}
		var apreslavirgule = Math.floor((temps_video - Math.floor(temps_video))*1000);
		//document.getElementById("video_timer").innerHTML = 'video (s): ' + Math.floor(tx) + ',' + apresvirgule ;
		var message_temps_video = 'temps video (s): ' + Math.floor(temps_video) + ',' + apreslavirgule;
		
		document.getElementById("pointeur_position").innerHTML = message_position + ' ; ' + message_temps_video;

		video.currentTime = temps_video;
		repositionne = true;
		zerodemande = false;
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
			//var img = document.getElementById("partition");
			video.play(); // 200502
			var tx = video.currentTime;
			var apresvirgule = Math.floor((tx - Math.floor(tx))*1000);
			document.getElementById("video_timer").innerHTML = 'video (s): ' + Math.floor(tx) + ',' + apresvirgule ;
			document.getElementById("etat").innerHTML = "marche: " + marche;
			
			for (var i = 0; i < 16; i++){
				if (tx >= to_tab[i] && tx < to_tab[i + 1] ){
					posX = calculer_mouvement(poso_tab[i], poso_tab[i+1], to_tab[i], to_tab[i+1], tx); // 200508 correc de 200507
				}
			}
						
			var date = new Date();
			var heures = date.getHours();
			var millisecondes = date.getMilliseconds();
			var secondes = date.getSeconds();
			var instant = millisecondes + (1000 * secondes) + (3600000 * heures);
			//var instantDepart = fixer_instant_du_depart();
			var temps = instant - instantDepart; 
		
			var messageSec = 'Temps (s): ' + Math.floor(temps)/1000 /*+ ',' + (temps - Math.floor(temps/1000))*/; // 200505
			var messagePos = 'Position du curseur: ' + Math.floor(posX);
		
			ecrireMessagePos(canvas, messagePos);
			
			
			document.getElementById("curseur_position").innerHTML = 'curseur (px): ' + Math.floor(posX);
		} // fin if marche true
		
		else {
			video.pause(); // 200502
			document.getElementById("etat").innerHTML = "marche: " + marche;
			//posX = 55;
		}
		
		if (zerodemande == true) {
			posX = 55;
			document.getElementById("etat").innerHTML = "marche: " + marche;
		}
		
		if (repositionne == true) {
			posX = repositioX;
			repositionne = false;
		}
		
		
		window.requestAnimationFrame(function() { curseur(posX) });
	
	}

	 curseur(55);
 });
 