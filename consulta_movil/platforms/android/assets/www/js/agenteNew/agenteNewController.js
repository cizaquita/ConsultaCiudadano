define(["app", "js/agenteModel", "js/agenteNew/agenteNewView"], function(app, Agente, View) {

	var contact = null;
	var state = {
		isNew: false
	};
	var bindings = [];

	function init(query){
		agente = new Agente();
		state.isNew = true;
		View.render({ model: agente, bindings: bindings, state: state, doneCallback: saveAgente });
	}

	$('.btn-aceptar').on('click', function() {
			var registerValues = $('.contact-edit-form input');
			saveAgente(registerValues);
	});	

	function saveAgente(registerValues) {
		agente.setValues(registerValues);
		if (!agente.validate()) {
			app.f7.alert("Debe completar todos los campos para continuar.");
			return;
		}else{
			//Registro de nuevo agente
			var identificacion = registerValues[0].value;
			var nombres = registerValues[1].value;
			var apellidos = registerValues[2].value;
			var fuerza_publica = registerValues[3].value;
			var rango_fp = registerValues[4].value;
			var id_fp = registerValues[5].value;
			var email = registerValues[6].value;
			api.addAgente(identificacion, nombres, apellidos, fuerza_publica, rango_fp,
				email, id_fp, function(data){
					data = JSON.parse(data);
					if (data.status == 'ok') {
						app.f7.alert(data.response + ' Recibirá un correo electrónico con su información de inicio de sesión.');
					}else{
						app.f7.alert(data.response + '\nVerifique y corrija la información.', 'Error');
					}
				});

		}
	}

	function closePage() {
		app.router.load('login');
		app.f7.closeModal();
	}

	return {
		init: init
	};
});