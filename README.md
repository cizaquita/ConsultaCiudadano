# ConsultaCiudadano
Universidad El Bosque, Ingeniería de Software. Desarrollo de software que permite administrar de manera sencilla toda la información general del ciudadano a través de la cédula de ciudadanía Colombiana, consultar por medio de un móvil y peticiones a una API el estado de un ciudadano.



# Características

Se desarrollan tres modulos:
* Registro de Ciudadanos por medio de un módulo web (CRUD) con API para consulta del ciudadano por medio de la identificación
  * El sistema permite la gestión y administración de los ciudadanos. Para ello, se almacenan:
    * Información del ciudadano
    * Nombres
    * Apellidos
    * Identificación
    * Fecha de nacimiento
    * Lugar de nacimiento
    * Fecha de expedición
    * Lugar de expedición
    * RH
    * Grupo sanguíneo
    * Estatura
  * El sistema permite la generación de un reporte de los ciudadanos. Para ello, se filtran:
    * Requeridos / No requeridos
    * Resultado
    * Identificación
    * Nombres
    * Apellidos
  * El reporte es generado en PDF.

* Aplicación móvil (Android & iOS) creada en Cordova encargada de consumir los servicios de las dos API. Además de poder escanear el código PDF417 de la cedula de ciudadanía colombiana.
  * La aplicación permite al usuario (personal de la fuerza pública) registrarse, ingresando sus datos principales:
    * Información registro
    * Identificación
    * Nombres
    * Apellidos
    * Fuerza pública (Policía, Ejército, Armada o Fuerza Aérea)
    * Rango (Dependiendo de la fuerza pública)
    * ID Fuerza
    * Correo electrónico
  * Cuando el usuario se registra, el sistema valida contra la base de datos del Departamento de Defensa y si está todo correcto le llega un correo de confirmación proporcionando una contraseña que se genera automáticamente
    * 6 caracteres
    * Mínimo una mayúscula, una minúscula y un número.
  * La aplicación permite al usuario (personal de la fuerza pública), ingresar sus credenciales como autenticación:
    * Email
    * Contraseña
    * Recordar contraseña
  * La aplicación permite al usuario (personal de la fuerza pública) leer con su teléfono o tablet el código de barras de la cédula de ciudadanía del ciudadano y consultar sus antecedentes judiciales:
    * Código de barras (identificación)
    * Información de resultado
    * Estado del ciudadano (Requerido o No requerido)

* Fuerza Pública por medio de un módulo web (CRUD) con API para crear un nuevo agente de la fuerza publica, login y recuperar contraseña.

## Capturas

### Registro de Ciudadanos (reg_ciudadanos)
<img src="/capturas/reg_ciudadanos/1.PNG" alt="Inicio CRUD" width="200px" height="150px">  <img src="/capturas/reg_ciudadanos/2.PNG" alt="Consulta de ciudadanos CRUD" width="200px" height="150px">  <img src="/capturas/reg_ciudadanos/3.PNG" alt="Ciudadanos Requeridos CRUD" width="200px" height="150px">  <img src="/capturas/reg_ciudadanos/4.PNG" alt="Generar reporte PDF" width="200px" height="150px">  
### App Móvil [iOS & Android] (consulta_movil)
<img src="/capturas/consulta_movil/1.png" alt="Inicio app móvil" width="100px" height="170px">  <img src="/capturas/consulta_movil/2.png" alt="Menú app móvil" width="100px" height="170px">  <img src="/capturas/consulta_movil/3.png" alt="Registro app móvil" width="100px" height="170px">  <img src="/capturas/consulta_movil/4.png" alt="Reuperaión app móvil" width="100px" height="170px">  <img src="/capturas/consulta_movil/5.png" alt="Consulta app móvil" width="100px" height="170px">  <img src="/capturas/consulta_movil/6.png" alt="Consulta app móvil" width="100px" height="170px"> 

# Archivos

* `reg_ciudadano` Carpeta contenedora del módulo de Registro de Ciudadanos
* `consulta_movil` Carpeta contenedora de la aplicación móvil (Android & iOS)
* `fuerza_publica` Carpeta contenedora del módulo de Registro de Ciudadanos


# Instalación y despliegue
https://cizaquita.github.io/ConsultaCiudadano/
