# RegistroCiudadanos - Bienvenido

Este software es desarrollado por:
- Sindy Lorena Gutierrez Pérez
- Cristian Iván Izaquita Morales
- Andrés Ramiro Villegas Oyola

Desarrollado para el Docente _Carlos Andrés López Ospina._

**Alojado acualmente en: [RegistroCiudadanos](http://ada.resistencia.la:8000)**

Por el momento el repositorio es privado hasta que decidamos liberarlo, todo para evitar mal entendidos o copia.



-------------------------------------
## Instalación de ambiente de desarrollo para el proyecto
- El proyecto está pensado para desarrollarse en python con el framework Django para entorno web que sirve también para dar solución al requerimiento de una API Rest y utilizando un motor de bases de datos como MySQL (MariaDB). 
- Primero se instalará el motor de base de datos MySQL, luego python, con este django y las dependencias necesarias.
* Éste tutorial de instalación se desarrolló para el sistema operativo windows.

### Instalación de MySQL
- Descargar e instalar WAMP Server [wampserver.com](http://www.wampserver.com/en/) para utilizar el motor de base de datos MySQL y su administrador del motor PHPMySQL.

### Instalación de python
- Descargar e instalar última version de [python, actualmente 3.6.3](https://www.python.org/downloads/)
- Seleccionar la opción para añadir python a variables de entorno del sistema `System PATH`
- Una vez instalado abrir la ventana de comandos `cmd` y escribir `python --version` para verificar que la instalación ha sido exitosa debe aparecer la versión de python instalada.

### Instalación de Framework Django
- En la ventana de comandos `cmd` escribir `pip install django` lo cuál instalará la última versión del mismo.
- Si ocurre algún error de permisos, ejecute la ventana de comandos como administrador.
- Verificar la instalacion escribiendo `python -m django --version`


## Clonando y desplegando el proyecto localmente.
- Debe tener instalado Git, puede descargarlo aca. [Git Downloads](https://git-scm.com/downloads)
- Luego de las configuraciones iniciales, debe descargar el repositorio.
- `git clone https://github.com/cizaquita1/ConsultaCiudadano.git`

## Iniciando el proyecto localmente.
- Ir a la carpeta `reg_ciudadanos` y ejecutar por `cmd` el comando `pip install -R requerimientos.txt` verificar la existencia del archivo `requerimientos.txt`
- Renombrar el archivo `reg_ciudadanos/reg_ciudadanos/settings.py.dist` a `settings.py`
- Abrir el archivo `settings.py` y modificar la seccion `DATABASES` con el `NAME`, `USER`, `PASSWORD`... correctos para acceder a su base de datos MySQL.
- En la carpeta `reg_ciudadano` abrir el `cmd` y ejecutar `python manage.py migrate` (Verificar la existencia del archivo manage.py)... Esto hara que se haga una migracion del modelo creado en python a la base de datos que han configurado. Es decir creara las tablas y relaciones de acuerdo al modelo.
- Ejecutar en el cmd `python manage.py createsuperuser` y seguir las instrucciones. Con este usuario logueara en el panel administrativo.
- Un vez hecha la migracion puede ejecutar `python manage.py runserver` le mostrara el siguiente mensaje si todo es correcto:
- ![Imagen](https://i.imgur.com/rc4RGR4.png) 
- Ahora deberia poder ver la aplicacion en su navegador en [127.0.0.1:8000](http://127.0.0.1:8000)


--------------------------------------------------------------------
