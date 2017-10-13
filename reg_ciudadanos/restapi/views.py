from django.shortcuts import render
from .models import Departamento, Ciudad, Identificacion, Ciudadano
from rest_framework import viewsets
from .serializers import *

# Create your views here.


# ViewSets define the view behavior.
class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer
    
class CiudadViewSet(viewsets.ModelViewSet):
    queryset = Ciudad.objects.all()
    serializer_class = CiudadSerializer

    
class IdentificacionViewSet(viewsets.ModelViewSet):
    queryset = Identificacion.objects.all()
    serializer_class = IdentificacionSerializer

    
class CiudadanoViewSet(viewsets.ModelViewSet):
    queryset = Ciudadano.objects.all()
    serializer_class = CiudadanoSerializer
