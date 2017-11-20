from restapi.models import Agente
from rest_framework import serializers
 
class AgenteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Agente
        fields = ('identificacion', 'nombres', 'apellidos', 'fuerza_publica', 'rango', 'id_fp', 'email')