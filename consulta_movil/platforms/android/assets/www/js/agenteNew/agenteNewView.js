define(['app', 'js/agenteModel', 'hbs!js/agenteNew/agenteNew'], function(app, Agente, addTemplate) {
	var $ = Dom7;

	function render(params) {
		var template = addTemplate({ model: params.model, state: params.state });
		app.f7.popup(template);
		bindEvents(params.bindings);
		bindSaveEvent(params.doneCallback);
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	function bindSaveEvent(doneCallback) {
		$('.agente-save-link').on('click', function() {
			var inputValues = $('.contact-edit-form input');
			doneCallback(inputValues);
		});
	}

	return {
		render: render
	};
});