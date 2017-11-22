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
			var identificacion = consultaValues[0].value;
			consultar(identificacion);
		});

		$('.btn-salir').on('click', function() {
			app.router.load('login');
			app.f7.closeModal();
		});
	}

	function consultar(identificacion){
		//var identificacion = $('.identificacion').value;
		console.log('identificación : ' + identificacion);
		api.consultarCiudadano(identificacion, function(data){
			data = JSON.parse(data);
			console.log(data)
			if (data.status == 'ok') {
				if (data.requerido) {
					app.f7.alert('Estado del ciudadano: ' + data.nombres + ' ' + data.apellidos +
					'\n con número de identificación ' + identificacion + ', es REQUERIDO.','Consulta');
				}else {
					app.f7.alert('Estado del ciudadano: ' + data.nombres + ' ' + data.apellidos +
					'\n con número de identificación ' + identificacion + ', No es requerido.','Consulta');
				}
			}else{
				app.f7.alert(data.response,'Error');
			}

		});
	}

	return {
		render: render
	};
});