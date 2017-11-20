define(["app", "js/login/loginView"], function(app, LoginView) {
	var $ = Dom7;
	/**
	 * Bindings array. Bind DOM event to some handler function in controller
	 * @type {*[]}
	 */
	var bindings = [{
		element: '.btn-link-registro',
		event: 'click',
		handler: registro
	}, {
		element: '.recuperar-password',
		event: 'click',
		handler: recuperarPassword
	}, {
		element: '.list-panel-registro',
		event: 'click',
		handler: registro
	}
	];

    function init() {
		LoginView.render({
			bindings: bindings
		});
	}

	$('.btn-ingresar').on('click', function() {
			var loginValues = $('.login-form input');
			var email = loginValues[0].value;
			var password = loginValues[1].value;
			validarLogin(email, password);
		});

	function validarLogin(email, password){
			if (email.length > 3 && password.length > 3) {
				console.log('login exitoso')
				app.router.load('escaner');
			}else {
				app.f7.alert("Datos incompletos.");
				return;
			}
	}

	function registro(){
		app.router.load('agenteNew');
	}

	function recuperarPassword(){
		alert('recuuperar password');
	}
	function registro() {
		app.router.load('agenteNew');
	}

	function showFavorites() {
		app.router.load('agenteNew');
	}

    return {
        init: init
    };
});