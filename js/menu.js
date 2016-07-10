//Smooth scroll
var navbarItems = document.querySelectorAll('.menu ul li');

for (var i = 0; i < navbarItems.length; i++) {
	navbarItems[i].addEventListener('click', function (evt) {
		
		deleteActiveClass();
		
		addClass(this,'active');

		var sectionToGo = this.getElementsByTagName('a')[0].href.split('#');
		if (sectionToGo.length>1) {
			evt.preventDefault();
			var goTo = sectionToGo[sectionToGo.length - 1];
			getElementbyIdAndScroll(goTo);
		}
	});
}

function getElementbyIdAndScroll (name) {
	var elem;
	if (name=='') {
		elem = document.getElementsByClassName('header')[0];
	} else {
		elem = document.getElementById(name);
	}

	scrollToElement(elem);
}

function scrollToElement(element) {
	var jump = parseInt(element.getBoundingClientRect().top * .3);
	document.body.scrollTop += jump;
	document.documentElement.scrollTop += jump;

	if (!element.lastJump || element.lastJump > Math.abs(jump)) {
		element.lastJump = Math.abs(jump);

		setTimeout (function () {
			scrollToElement(element);
		}, "60");
	} else {
		element.lastJump = null;
		document.body.scrollTop = element.offsetTop;
		document.documentElement.scrollTop = element.offsetTop;
	}
}

//Change active item
var cumulativeOffset = function (element) {
	var top = 0;
	do {
		top += element.offsetTop || 0;
		element = element.offsetParent;
	} while (element);

	return top;
}

var offsetQuienSoy = cumulativeOffset(document.getElementById('quien-soy'));
var offsetFormacion = cumulativeOffset(document.getElementById('formacion'));
var offsetExperiencia = cumulativeOffset(document.getElementById('experiencia'));
var offsetSobreMi = cumulativeOffset(document.getElementById('sobre-mi'));
var offsetContacto = cumulativeOffset(document.getElementById('contacto'));
var navbar = document.getElementsByClassName('menu')[0];

window.addEventListener('scroll', changeMenuStyle);

function changeMenuStyle (evt) {
	var previous;

	if (window.pageYOffset >= 0 && window.pageYOffset < offsetQuienSoy) {
		if (!previous) {
			previous = 1;
		} else if (previous == 1) {
			return false;
		}
		deleteActiveClass();
		addClass(document.querySelector('a[href="#"]').parentNode,'active');
	} else if (window.pageYOffset >= offsetQuienSoy && window.pageYOffset < offsetFormacion) {
		if (!previous) {
			previous = 2;
		} else if (previous == 2) {
			return false;
		}
		deleteActiveClass();
		addClass(document.querySelector('a[href$="quien-soy"]').parentNode,'active');
	} else if (window.pageYOffset >= offsetFormacion && window.pageYOffset < offsetExperiencia) {
		if (!previous) {
			previous = 3;
		} else if (previous == 3) {
			return false;
		}
		deleteActiveClass();
		addClass(document.querySelector('a[href$="formacion"]').parentNode,'active');
	} else if (window.pageYOffset >= offsetExperiencia && window.pageYOffset < offsetSobreMi) {
		if (!previous) {
			previous = 4;
		} else if (previous == 4) {
			return false;
		}
		deleteActiveClass();
		addClass(document.querySelector('a[href$="experiencia"]').parentNode,'active');
	} else if (window.pageYOffset >= offsetSobreMi && window.pageYOffset < offsetContacto) {
		if (!previous) {
			previous = 5;
		} else if (previous == 5) {
			return false;
		}
		deleteActiveClass();
		addClass(document.querySelector('a[href$="sobre-mi"]').parentNode,'active');
	} else if (window.pageYOffset >= offsetContacto) {
		if (!previous) {
			previous = 6;
		} else if (previous == 6) {
			return false;
		}
		deleteActiveClass();
		addClass(document.querySelector('a[href$="contacto"]').parentNode,'active');
	}
}

function deleteActiveClass() {
	for (var i = 0; i < navbarItems.length; i++) {
		navbarItems[i].setAttribute('class', '');
	}
}

function addClass(elem, clase) {
    if (Modernizr.classList) {
        elem.classList.add(clase);
    } else {
        elem.className += ' ';
		elem.className += clase;
    }
}