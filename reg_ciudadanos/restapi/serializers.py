# Aquí será donde representemos los datos que queremos devolver a través de la api


from .models import Departamento, Ciudad, Identificacion, Ciudadano
from rest_framework import serializers


class DepartamentoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Departamento
        fields = ('id', 'nombre')

class CiudadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ciudad
        fields = ('id', 'nombre')

class IdentificacionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Identificacion
        fields = ('id', 'nombre')

class CiudadanoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ciudadano
        fields = ('id','nombres', 'apellidos', 'tipo_identificacion', 'identificacion', 'fecha_nacimiento', 'lugar_nacimiento', 'fecha_expedicion', 'lugar_expedicion', 'rh', 'grupo_sanguineo', 'estatura', 'fecha_registro', 'requerido')