// EFECTO PARALLAX

$(document).ready(function(){

	$(window).scroll(function(){
		var barra = $(window).scrollTop();
		var posicion =  (barra * 0.04);

		$('body').css({
			'background-position': '0 -' + posicion + 'px'
		});

	});

});

// http://www.javascriptkit.com/dhtmltutors/parallaxscrolling/


// MENÚ DE NAVAGECIÓN

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
		$('.container').css('margin-top', (menuHeight) + 'px');
	} else if ($(window).scrollTop() >= sectionHeight){
		$('.header-content').addClass('fixed');
		$('.nav').css('width', '90%');
		$('.container').css('margin-top', (menuHeight) + 'px');
		$('.main-test-title').css('margin-top', (menuHeight) + 'px');
	} else {
		$('.header-content').removeClass('fixed');
		$('.nav').css('width', '100%');
		$('.container').css('margin-top', '0');
		$('.main-test-title').css('margin-top', '0');
	}
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


// GRAFICOS TABLEAU

// para que aparezca por debajo del menú fixed
setTimeout(function() {
	var tableauIframeList = document.querySelectorAll('iframe');
	for (var i = 0; i < tableauIframeList.length; i++) {
		var tableauIframe = tableauIframeList[i];
		var src = tableauIframe.getAttribute('src');
		tableauIframe.setAttribute('src', src + '?wmode=transparent');
		if (src.indexOf('Grfico2_2/Hoja1') > 0) {
			tableauIframe.style('heigth', "200px");
		}
	}
}, 1000);

// para cambiar propiedad heigth

// setTimeout(function() {
// 	function changeHeigth (){
//   var grafIdTableau = document.getElementById('viz1496486952761');
// 	var grafTableau = document.querySelectorAll('iframe');
//     grafTableau.setAttribute('height', "200px");
// 	}
// }, 1000);
