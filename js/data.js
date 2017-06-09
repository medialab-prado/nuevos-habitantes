'use strict';

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
