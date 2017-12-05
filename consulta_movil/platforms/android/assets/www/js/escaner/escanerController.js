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

	function escanear(callback){
		escaner.escanear(function(result){
			api.consultarCiudadano(result, function(data){
				data = JSON.parse(data);
				console.log(data)
				if (data.status == 'ok') {
					if (data.requerido) {
						app.f7.alert('Estado del ciudadano: ' + data.nombres + ' ' + data.apellidos +
						'\n con número de identificación ' + result + ', es REQUERIDO.','Consulta');
					}else {
						app.f7.alert('Estado del ciudadano: ' + data.nombres + ' ' + data.apellidos +
						'\n con número de identificación ' + result + ', No es requerido.','Consulta');
					}
				}else{
					app.f7.alert(data.response,'Error');
				}

			})
		});
	}

	function salir(){
		app.router.load('login');
		app.f7.closeModal();
	}

    return {
        init: init
    };
});