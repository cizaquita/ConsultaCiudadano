/*
Script que permite consulta a travez de peticiones get y post a la API
*/

var $ = Dom7;
var API_CIUDADANOS = 'http://ada.resistencia.la:8000/';
var API_FUERZA_PUBLICA = 'http://ada.resistencia.la:9000/';
//var API_FUERZA_PUBLICA = 'http://127.0.0.1:8000/';
var api = {
    // Application Constructor
    addAgente: function(identificacion, nombres, apellidos, fuerza_publica, rango, email, id_fp, callback) {
    	var data = [];
    	data.identificacion = identificacion;
    	data.nombres = nombres;
    	data.apellidos = apellidos;
    	data.fuerza_publica = fuerza_publica;
    	data.rango = rango;
    	data.email = email;
    	data.id_fp = id_fp;

        $.post(API_FUERZA_PUBLICA + 'add_agente/', data, function(success){
        	console.log(success);
        	callback(success);
        }, function(error){
        	console.log(error);
        	callback(error);
        });
    },
    login: function(email, password, callback){
        var data = [];
        data.email = email;
        data.password = password;

        api.request('post', API_FUERZA_PUBLICA + 'login/', data, function(data){
            console.log(data);
            callback(data);
        });
        /*$.post(API_FUERZA_PUBLICA + 'login/', data, function(success){
            console.log(success);
            callback(success);
        }, function(error){
            console.log(error);
            callback(error);
        });*/
    },
    consultarCiudadano: function(identificación, callback){
        var data = [];
        data.identificacion = identificacion;

        $.post(API_CIUDADANOS + 'consulta_ciduadano/', data, function(success){
            callback(success);
        }, function(error){
            callback(error);
        })
    },

    request: function(method, url, data, callback) {
        var formData, i,
            xmlhttp = new XMLHttpRequest();

        if (typeof callback !== 'function') {
            callback = undefined;
        }

        if (method.toLowerCase() === 'post') {
            formData = new FormData();

            for (i in data) {
                if (!data.hasOwnProperty(i)) {
                    continue;
                }
                formData.append(i, data[i]);
            }
        } else {
            if (data) {
                url += '?' + api.serialize(data);
            }
        }

        xmlhttp.onreadystatechange = function () {
            var result = null;

            if (xmlhttp.readyState !== 4) {
                return;
            }

            try {
                result = JSON.parse(xmlhttp.responseText);
            } catch (e) {
                console.error('JSON parse error: ' + e);
            }

            if (callback) {
                callback(result);
            }
        };

        xmlhttp.open(method, url, true);
        try {
            xmlhttp.send(formData);
        } catch (e) {
            var error = "error formdata: " + e.description;
        }
    },
    serialize: function(obj) {
        var p,
        str = [];

        for (p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }

        return str.join('&');
    }

};