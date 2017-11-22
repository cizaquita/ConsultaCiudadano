define(["app", "js/escaner/escanerView"], function(app, EscanerView) {
	var $ = Dom7;
	/**
	 * Bindings array. Bind DOM event to some handler function in controller
	 * @type {*[]}
	 */
	var bindings = [ {
		element: '.btn-escanear',
		event: 'click',
		handler: escanear
	}
	];

    function init() {
    	EscanerView.render({ bindings: bindings});
	}

	$('.btn-consultar').on('click', function() {
		var consultaValues = $('.consulta-cedula-form input');
		var identificacion = consultaValues[0].value;
		consultar(identificacion);
	});

	function consultar(identificacion){
		//var identificacion = $('.identificacion').value;
		console.log('identificación : ' + identificacion);
		api.consultarCiudadano(identificacion, function(data){
			data = JSON.parse(data);
			console.log(data)
			if (data.status == 'ok') {
				if (data.requerido == 'True') {
					app.f7.alert('Estado del ciudadano: ' + data.nombres + ' ' + data.apellidos +
					'\nEs: Requerido','Consulta');
				}else {
					app.f7.alert('Estado del ciudadano: ' + data.nombres + ' ' + data.apellidos +
					'\nEs: No requerido','Consulta');
				}
			}else{
				app.f7.alert(data.response,'Error');
			}

		});
	}

	function escanear(callback){
		escaner.escanear(function(result){
			api.consultarCiudadano(result, function(data){
				data = JSON.parse(data);
				console.log(data)
				if (data.status == 'ok') {
					if (data.requerido) {
						app.f7.alert('Estado del ciudadano: ' + data.nombres + ' ' + data.apellidos +
						'\nEs: No requerido','Consulta');
					}else {
						app.f7.alert('Estado del ciudadano: ' + data.nombres + ' ' + data.apellidos +
						'\nEs: Requerido','Consulta');
					}
				}else{
					app.f7.alert(data.response,'Error');
				}

			})
		});
	}

	function salir(){
		alert('salir');
	}

    return {
        init: init
    };
});