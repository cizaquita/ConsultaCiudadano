define(['app'],function(app) {

    function Agente(values) {
		values = values || {};
		this.guid = values['id'] || app.utils.generateGUID();

		this.identificacion = values['identificacion'] || '';
		this.nombres = values['nombres'] || '';
		this.apellidos = values['apellidos'] || '';
		this.fuerza_publica = values['fuerza_publica'] || '';
		this.rango_fp = values['rango_fp'] || '';
		this.email = values['email'] || '';
		this.id_fp = values['id_fp'] || '';
    }

	Agente.prototype.setValues = function(inputValues) {
		for (var i = 0, len = inputValues.length; i < len; i++) {
			var item = inputValues[i];
			if (item.type === 'checkbox') {
				this[item.id] = item.checked;
			}
			else {
				this[item.id] = item.value;
			}
		}
	};

	Agente.prototype.validate = function() {
		var result = true;
		if (_.isEmpty(this.identificacion) && _.isEmpty(this.nombres) && _.isEmpty(this.apellidos) 
			&& _.isEmpty(this.fuerza_publica) && _.isEmpty(this.rango_fp)  && _.isEmpty(this.email)
			 && _.isEmpty(this.id_fp)) {
			result = false;
		}
		return result;
	};

    return Contact;
});