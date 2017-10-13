from django.db import models

# Create your models here.


# Creamos el modelo de departamento para poblar la base de datos
class Departamento(models.Model):
	nombre = models.CharField(max_length=200)
	def __str__(self):
		return self.nombre

# Se crea la ciudad para poblar la base de datos
class Ciudad(models.Model):
	departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)
	nombre = models.CharField(max_length=200)

	def __str__(self):
		return self.nombre + ' - ' + self.departamento.nombre


# Se crea un modelo de tipo de identificacion
class Identificacion(models.Model):
	nombre = models.CharField(max_length=200)

	def __str__(self):
		return self.nombre
		
# Modelo proncipal, CIUDADANO
class Ciudadano(models.Model):
	GRUPOS_SANGUINEOS = (
        ('Positivo', 'Positivo'),
        ('Negativo', 'Negativo'),
    )
	TIPOS_RH = (
        ('A', 'A'),
        ('B', 'B'),
        ('AB', 'AB'),
        ('O', 'O'),
    )	

	nombres = models.CharField(max_length=200)
	apellidos = models.CharField(max_length=200)
	tipo_identficacion = models.ForeignKey(Identificacion, on_delete=models.CASCADE)
	identificacion = models.CharField(max_length=200)
	fecha_nacimiento = models.DateTimeField('Fecha de nacimiento')
	# References to ciudad
	lugar_nacimiento = models.ForeignKey(Ciudad, on_delete=models.CASCADE, related_name='lugar_nacimiento')
	fecha_expedicion = models.DateTimeField('Fecha de expedicion')
	# References to ciudad
	lugar_expedicion = models.ForeignKey(Ciudad, on_delete=models.CASCADE, related_name='lugar_expedicion')
	rh = models.CharField(max_length=3, choices=TIPOS_RH)
	grupo_sanguineo = models.CharField(max_length=9, choices=GRUPOS_SANGUINEOS)
	estatura = models.FloatField()
	fecha_registro = models.DateTimeField(auto_now_add=True, editable=False)
	requerido = models.BooleanField(default=False)

	def __str__(self):
		return self.nombres + ' ' + self.apellidos
