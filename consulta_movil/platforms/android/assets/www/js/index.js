/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        app.iniciarScanner();
    },    
    iniciarScanner: function(){
        console.log('Scanner iniciado...')
        // Código para añadir la licencia
        // TODO: crear handler para iOS y Android, la licencia varia dependiendo del SO
        mwbScanner.setKey('27mck81WMmPTX7dcs7jsRw9H8yUnDeOplcHQIMwe5dA=').then(function(response){
            console.log(response);
        });

        // Se CREAN las configuraciones, el tipo de código que se quiere leer, EANUPC - PDF417
        var mw_c =  mwbScanner.getConstants(),
            settings;

        settings = 
            [
                {
                    'method': 'MWBsetActiveCodes', 'value': [mw_c.MWB_CODE_MASK_EANUPC | mw_c.MWB_CODE_MASK_PDF]
                },
                {
                    "method" : "MWBsetActiveParser", "value" : [mw_c.MWP_PARSER_MASK_AAMVA | mw_c.MWP_PARSER_MASK_IUID]
                }
            ];
        // Se CARGAN las configuraciones
        mwbScanner.loadSettings(settings).then(function(response){
            console.log(JSON.stringify(response));
        }).catch(function(reason){
            console.log(JSON.stringify(reason));
        });

    },
    escanear: function() {
        // Se crea la función para escanear el código y que devuelva la información
        mwbScanner.startScanning(function(result){
            console.log(JSON.stringify(result));
            app.transformarDatos(result);
        });
    },
    transformarDatos: function(datos){
        var datos_cedula = datos.code.substring(48,168);
        var numero_cedula = parseInt(datos_cedula.substring(0,10));
        var apellidos = app.limpiarString(datos_cedula.substring(10,56));
        var nombres = app.limpiarString(datos_cedula.substring(56,102));
        var sexo = datos_cedula.substring(103,104);
        if (sexo == 'M') {
            sexo = 'Masculino';
        }else sexo = 'Femenino';
        var anio_nacimiento = datos_cedula.substring(104,108);
        var mes_nacimiento = datos_cedula.substring(108,110);
        var dia_nacimiento = datos_cedula.substring(110,112);
        var edad = app.calcularEdad(anio_nacimiento + '/' + mes_nacimiento + '/' + dia_nacimiento);
        var rh = datos_cedula.substring(118,120);
        navigator.notification.vibrate(100);
        navigator.notification.alert('Cedula: ' + numero_cedula + '\nNombres: ' + nombres +
                                     '\nApellidos: ' + apellidos + '\nSexo: ' + sexo +
                                     '\nAño nacimiento: ' + anio_nacimiento +
                                     '\nMes nacimiento: ' + mes_nacimiento +
                                     '\nDia nacimiento: ' + dia_nacimiento +
                                     '\nRH: ' + rh +
                                     '\nEdad: ' + edad, null, 'Test Datos obtenidos', 'Aceptar')
    },
    limpiarString: function(texto){
        while (texto.includes('  ')){
            texto = texto.replace('  ', ' ');
        }
        return texto.trim();
    },
    calcularEdad: function(fechaString){
            var hoy = new Date();
            var f_nacimiento = new Date(fechaString);
            var edad = hoy.getFullYear() - f_nacimiento.getFullYear();
            var mes = hoy.getMonth() - f_nacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < f_nacimiento.getDate())) {
                edad--;
            }
            return edad;
    }
};
