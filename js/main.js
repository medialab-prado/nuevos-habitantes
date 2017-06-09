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
	} else if ($(window).scrollTop() >= sectionHeight){
		$('.header-content').addClass('fixed');
		$('.nav').css('width', '90%');
		$('.main-test-title').css('margin-top', (menuHeight) + 'px');
	} else {
		$('.header-content').removeClass('fixed');
		$('.nav').css('width', '100%');
		$('.main-test-title').css('margin-top', '0');
	}
}

//Segunda barra de navegación-datos active

$(document).ready(function () {
	$(document).on("scroll", onScroll);// le añade la función onScroll al evento scroll del document
	$('.submenu-data-links').on('click', function (e) {// a los <a> le añade el evento click y ejecuta la funcion cuando le das click
		e.preventDefault();
		$(document).off("scroll");
		$('.submenu-data-links').each(function () {
			$(this).removeClass('active');
		})
		$(this).addClass('active');

		var target = this.hash;//#de-donde

		target = $(target);// target = $("#de-donde");

		var MenutoContainerPx = 200;
		if($(".header-content").attr("class").indexOf("fixed") != -1){
			MenutoContainerPx = 100;
		}

		$('html, body').stop().animate({
			'scrollTop': target.offset().top - MenutoContainerPx},
			500,
			'swing', function () {
				$(document).on("scroll", reactiveScroll);
			}
		);
	});
});

//Reactivar onScroll
function reactiveScroll(event) {
	$(document).on("scroll", onScroll);
}

//Cambiar el color de los <a> según vas bajando o subiendo.
function onScroll(event) {
	var scrollPos = $(document).scrollTop();// la altura de la web en la que se encuentra el scroll
	$('.submenu-data-links').each(function () {// va pasandole a la funcion cada uno de los elementos del "array"
		var currLink = $(this);
		var refElement = $(currLink.attr("href")); //$("#como") => el div (ID=como).El div que corresponde a cada etiqueta del menu
		if ((refElement.position().top <= scrollPos) && (refElement.position().top + refElement.height() > scrollPos)) {
			currLink.addClass("active");
		}
		else {
			currLink.removeClass("active");
		}
	});
}


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
