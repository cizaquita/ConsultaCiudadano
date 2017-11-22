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
	},{
		element: '.btn-consultar',
		event: 'click',
		handler: consultar
	},{
		element: '.btn-salir',
		event: 'click',
		handler: salir
	}
	];

    function init() {
    	EscanerView.render({ bindings: bindings});
	}

	function escanear(callback){
		escaner.escanear(function(result){
			console.log('escanerar escaner controller' + result);
		});
	}

	function consultar(){
		alert('consulta');
	}

	function salir(){
		alert('salir');
	}

    return {
        init: init
    };
});