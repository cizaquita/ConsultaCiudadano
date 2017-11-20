define(["app", "js/agenteModel", "js/agenteNew/agenteNewView"], function(app, Agente, View) {

	var contact = null;
	var state = {
		isNew: false
	};
	var bindings = [];

	function init(query){
		//var contacts = JSON.parse(localStorage.getItem("f7Contacts"));
		/*if (query && query.id) {
			contact = new Contact(_.find(contacts, { id: query.id }));
			state.isNew = false;
		}
		else {
			contact = new Contact({ isFavorite: query.isFavorite });
			state.isNew = true;
		}*/

		agente = new Agente();
		state.isNew = true;
		View.render({ model: agente, bindings: bindings, state: state, doneCallback: saveAgente });
	}

	function saveAgente(inputValues) {
		agente.setValues(inputValues);
		if (!agente.validate()) {
			app.f7.alert("Debe completar todos los campos para continuar.");
			return;
		}
		// TODO: CREAR VISTA inicio, será el login
		app.router.load('login'); // reRender main page view
		closePage();
	}

	function closePage() {
		app.router.load('login');
		console.log('closePage de agenteNew')
		app.f7.closeModal();
	}

	return {
		init: init
	};
});