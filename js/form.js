var form = document.getElementById('form-contact');

var apellidosInput = document.getElementsByName('conocido');
var campoConocidoComo = document.getElementById('campo_conocido_como');

for (var i = 0; i < apellidosInput.length; i++) {
	apellidosInput[i].addEventListener("click", function() {
		if (this.value == "otros") {
			campoConocidoComo.style.display = "block";
		} else {
			campoConocidoComo.style.display = "none";
		}
	});
}

form.addEventListener("submit", function (evt) {
	var nombreInput = document.getElementById("nombre");
	var emailInput = document.getElementById("email");	
	
	var conocidoRadioInput = {
		"conocido_google": document.getElementById("conocido_google"),
		"conocido_portfolio": document.getElementById("conocido_portfolio"),
		"conocido_recomendacion": document.getElementById("conocido_recomendacion"),
		"conocido_otros": document.getElementById("conocido_otros")
	};
	var conocidoComoInput = document.getElementById("conocido_como");
	var telefonoInput = document.getElementById("telefono");
	var comentariosTextarea = document.getElementById("comentarios");

	//Nombre
	if (!checkRelleno(nombreInput)) {
		alert("Escribe tu nombre");
		nombreInput.focus();
		evt.preventDefault();
		return false;
	}

	//Email
	if (!checkEmail(emailInput)) {
		alert("El e-mail indicado no es correcto");
		emailInput.focus();
		evt.preventDefault();
		return false;	
	}
	
	//Conocido
	if (!conocidoRadioInput.conocido_google.checked && !conocidoRadioInput.conocido_portfolio.checked && !conocidoRadioInput.conocido_recomendacion.checked && !conocidoRadioInput.conocido_otros.checked) {
		alert("Selecciona cómo me has conocido");
		evt.preventDefault();
		return false;
	}
	
	if (campoConocidoComo.style.display === "block") {
		if (!checkRelleno(conocidoComoInput)) {
			alert("Indica cómo me has conocido");
			conocidoComoInput.focus();
			evt.preventDefault();
			return false;
		}
	}
	
	//Telefono
	if (!checkTelefono(telefonoInput)) {
		alert("El teléfono indicado no es correcto. Debe tener 9 dígitos, y empezar por 6, 7, 8 o 9.");
		telefonoInput.focus();
		evt.preventDefault();
		return false;	
	}
	
	
	//Comentarios
	if (!checkRelleno(comentariosTextarea) || checkNumPalabras(comentariosTextarea)>150) {
		alert('En el campo "Qué puedo hacer por tí" debes indicar lo que necesites, sin exceder las 150 palabras.');
		comentariosTextarea.focus();
		evt.preventDefault();
		return false;	
	}
});

function checkRelleno(elem) {
	if (elem.value=="") {
		return false;
	} else {
		return true;
	}
}

function checkEmail(elem) {
	var re = new RegExp("[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+");
    return re.test(elem.value);
}

function checkTelefono(elem) {
	var re = new RegExp("^[9|8|7|6][0-9]{8}");
    return re.test(elem.value);
}

function checkNumPalabras(elem) {
    return elem.value.split(" ").length;
}