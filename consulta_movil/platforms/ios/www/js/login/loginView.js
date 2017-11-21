define(['app'], function(template) {
    var $ = Dom7;

	function render(params) {
		bindEvents(params.bindings);
		bindSaveEvent();
    }

	function bindEvents(bindings) {
		for (var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}


	function bindSaveEvent() {
		$('.btn-ingresar').on('click', function() {
			var loginValues = $('.login-form input');
		});
	}

    return {
        render: render
    };
});