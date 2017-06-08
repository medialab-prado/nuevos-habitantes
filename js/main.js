// EFECTO PARALLAX
'use strict';

$(document).ready(function(){
	$(".myHeight").css("height","100px");
	$(window).scroll(function(){
		var barra = $(window).scrollTop();
		var posicion =  (barra * 0.04);

		$('body').css({
			'background-position': '0 -' + posicion + 'px'
		});

	});

});

// http://www.javascriptkit.com/dhtmltutors/parallaxscrolling/


// MENÚ DE NAVEGACIÓN

var btnMenu= document.getElementById("btn-menu");
var menuSmall= document.getElementById("menu-small");
var btnMenuClose= document.getElementById("btn-menu-close");
var btnSubnavData = document.getElementById("btn-subnav-data");
var subNavData = document.getElementById("sub-nav-data");
var subDataIcon = document.getElementById("subnav-data-img");
var btnSubnavTes = document.getElementById("btn-subnav-tes");
var subNavTes = document.getElementById("sub-nav-tes");
var subTesIcon = document.getElementById("subnav-tes-img");

//mostrar menú móvil
function showMenu(){
	menuSmall.style.width= "80%";
}
btnMenu.addEventListener("click", showMenu);


//ocultar menú móvil
function closeMenu(){
	menuSmall.style.width= "0";
}
btnMenuClose.addEventListener("click", closeMenu);


//Mostrar y ocultar submenú de datos en versión móvil
function openCloseSubNavData(){
	subNavData.classList.toggle("sub-nav-show");
	subDataIcon.classList.toggle("subnav-a-img-rotate");
}
btnSubnavData.addEventListener("click",openCloseSubNavData);


//Mostrar y ocultar submenú de testimonios en la versión móvil
function openCloseSubNavTes(){
	subNavTes.classList.toggle("sub-nav-show");
	subTesIcon.classList.toggle("subnav-a-img-rotate");
}
btnSubnavTes.addEventListener("click", openCloseSubNavTes);


//Fijar la barra de navegación
positionMenu();

$(window).scroll(function() {
	positionMenu();
});

function positionMenu() {
	var headerHeight = $('.title-container').outerHeight(true);
	var sectionHeight = $('.section-container').outerHeight(true);
	var menuHeight = $('.header-content').outerHeight(true);

	if ($(window).scrollTop() >= headerHeight){
		$('.header-content').addClass('fixed');
		$('.nav').css('width', '90%');
		// $('.container').css('margin-top', (menuHeight) + 'px');
	} else if ($(window).scrollTop() >= sectionHeight){
		$('.header-content').addClass('fixed');
		$('.nav').css('width', '90%');
		// $('.container').css('margin-top', (menuHeight) + 'px');
		$('.main-test-title').css('margin-top', (menuHeight) + 'px');
	} else {
		$('.header-content').removeClass('fixed');
		$('.nav').css('width', '100%');
		// $('.container').css('margin-top', '0');
		$('.main-test-title').css('margin-top', '0');
	}
}

//Segunda barra de navegación-datos active

$(document).ready(function () {
	$(document).on("scroll", onScroll);
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		$(document).off("scroll");
		$('a').each(function () {
			$(this).removeClass('active');
		})
		$(this).addClass('active');

		var target = this.hash,
		menu = target;
		target = $(target);

		var MenutoContainerPx = 200;
		if($(".header-content").attr("class").indexOf("fixed") != -1){
			MenutoContainerPx = 100;
		}

		$('html, body').stop().animate({
			'scrollTop': target.offset().top - MenutoContainerPx},
			500,
			'swing', function () {
				window.location.hash = target;
				$(document).on("scroll", reactiveScroll);
			}
		);
	});
});



function reactiveScroll(event) {
	$(document).on("scroll", onScroll);
}


function onScroll(event) {
	var scrollPos = $(document).scrollTop();
	$('.submenu-data a').each(function () {
		var currLink = $(this);
		var refElement = $(currLink.attr("href")); //$("#como") => el div (ID=como)
		if ((refElement.position().top <= scrollPos) && (refElement.position().top + refElement.height() > scrollPos)) {
			$('.submenu-data a').removeClass("active");
			currLink.addClass("active");
		}
		else {
			currLink.removeClass("active");
		}
	});
}

// Mostrar datos
var inputElement = document.getElementById('input');
var buttonElement = document.getElementById('button_show');
var percentageElement = document.getElementById('percentage');
var request = new XMLHttpRequest();
var municipioFound = false;
// para crear servidor local "python -m SimpleHTTPServer" en la terminal


function Consulthabitants(){
	var ObjJson = 'http://127.0.0.1:3000/convertcsv.json';
	request.open('GET', ObjJson, true);

	request.onload = function() {
		var showdata = JSON.parse(request.responseText);
		for (var i = 0; i < showdata.Datos.length; i++) {
			var townName = showdata.Datos[i].B;

			if (inputElement.value.toLowerCase() === townName.toLowerCase()) {
				percentageElement.innerHTML = Math.round(showdata.Datos[i].D * 100) + '%';
				municipioFound = true;
			}
		}

		if (!municipioFound) {
			percentageElement.innerHTML = 'No hay datos de este municipio.';
		}
	}

	request.onerror = function() {
		console.log('Error al tratar de conectarse con el servidor');
	};

	request.send();
}

buttonElement.addEventListener('click', Consulthabitants);


//Flecha para subir arriba en versión móvil

$(document).ready(function(){

	$('.up-page').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 1000);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.up-page').fadeIn(300);
		} else {
			$('.up-page').fadeOut(300);
		}
	});
})

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
