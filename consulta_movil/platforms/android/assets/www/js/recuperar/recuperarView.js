define(['app', 'hbs!js/escaner/escaner'], function(app, escanerTemplate) {
	var $ = Dom7;

	function render(params) {
		var template = escanerTemplate({ model: params.model, state: params.state });
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
		$('.btn-consultar').on('click', function() {
			var consultaValues = $('.consulta-cedula-form input');
			console.log('recuperarView')
		});
	}

	return {
		render: render
	};
});