from django.shortcuts import render
from rest_framework import viewsets
from restapi.models import Departamento, Ciudad, Identificacion, Ciudadano
from restapi.serializers import *
from django.http import HttpResponse
from django.template import loader

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


# Vista para la pagina principal
def index(request):
	lista_ciudadanos = Ciudadano.objects.order_by('-apellidos')
	template = loader.get_template('reg_ciudadanos/index.html')
	context = {
		'lista_ciudadanos': lista_ciudadanos,
	}
	return HttpResponse(template.render(context, request))
	#respuesta = ', '.join([c.apellidos + ' ' + c.nombres for c in lista_ciudadanos])
	#return HttpResponse(respuesta)
	

def ciudadano_detail(request, ciudadano_id):
	return HttpResponse("Pagina para visualizar el detalle del ciudadano_id: %s" % ciudadano_id)
