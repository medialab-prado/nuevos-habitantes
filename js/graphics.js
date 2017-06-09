'use strict';

// GRAFICOS TABLEAU

// para que aparezca por debajo del menú fixed
setTimeout(function() {
	var tableauIframeList = document.querySelectorAll('iframe');
	for (var i = 0; i < tableauIframeList.length; i++) {
		var tableauIframe = tableauIframeList[i];
		var src = tableauIframe.getAttribute('src');
		tableauIframe.setAttribute('src', src + '?wmode=transparent');
	}
}, 1000);

//Cambiar altura gráfico
$(document).ready(function(){
	$(".myHeight").css("height","100px");
});


// Mostrar datos
var inputElement = document.getElementById('input');
var buttonElement = document.getElementById('button_show');
var percentageElement = document.getElementById('percentage');
var request = new XMLHttpRequest();
var municipioFound = false;
// para crear servidor local "python -m SimpleHTTPServer" en la terminal


function Consulthabitants(){
	var ObjJson = 'https://adalab.github.io/ADAORBIT/js/convertcsv.json';
	request.open('GET', ObjJson, true);

	request.onload = function() {
		var showdata = JSON.parse(request.responseText);
		for (var i = 0; i < showdata.Datos.length; i++) {
			var townName = showdata.Datos[i].B;

			if (inputElement.value.toLowerCase() === townName.toLowerCase()) {
				percentageElement.innerHTML = Math.round(showdata.Datos[i].D * 100) + '%';
				percentage.style.fontSize = "4em";
				municipioFound = true;
			}
		}

		if (!municipioFound) {
			percentageElement.innerHTML = 'No hay datos de este municipio.';
			percentage.style.fontSize = "2em";
		}
	}

	request.onerror = function() {
		console.log('Error al tratar de conectarse con el servidor');
	};

	request.send();
}

buttonElement.addEventListener('click', Consulthabitants);
