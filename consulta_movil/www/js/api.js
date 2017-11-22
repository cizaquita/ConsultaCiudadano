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

        $.post(API_FUERZA_PUBLICA + 'login/', data, function(success){
            console.log(success);
            callback(success);
        }, function(error){
            console.log(error);
            callback(error);
        });
    },
    consultarCiudadano: function(identificacion, callback){
        var data = [];
        data.identificacion = identificacion;

        $.get(API_CIUDADANOS + 'consulta_ciudadano/', data, function(success){
            callback(success);
        }, function(error){
            callback(error);
        })
    },
    recuperarPassword: function(email, callback) {
        var data = [];
        data.email = email;

        $.post(API_FUERZA_PUBLICA + 'recuperar_password/', data, function(success){
            callback(success);
        }, function(error){
            callback(error);
        })
    }

};