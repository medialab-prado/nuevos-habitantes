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
var btnSubnav = document.getElementById("btn-subnav");
var subNav = document.getElementById("sub-nav");

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
function openCloseSubNav(){
  subNav.classList.toggle("sub-nav-show");
}
btnSubnav.addEventListener("click",openCloseSubNav);


//Fijar la barra de navegación
positionMenu();

$(window).scroll(function() {
    positionMenu();
});

function positionMenu() {
    var headerHeight = $('.title-container').outerHeight(true);
    var menuHeight = $('.header-content').outerHeight(true);

    if ($(window).scrollTop() >= headerHeight){
        $('.header-content').addClass('fixed');
				$('.nav').css('width', '90%');
				$('.nav').css('box-shadow', '0 5px 5px 3px rgba(0, 0, 0, 0.25)');
        $('.container').css('margin-top', (menuHeight) + 'px');
    } else {
        $('.header-content').removeClass('fixed');
				$('.nav').css('width', '100%');
				$('.nav').css('box-shadow', '0 5px 5px 3px rgba(0, 0, 0, 0)');
        $('.container').css('margin-top', '0');
    }
}
