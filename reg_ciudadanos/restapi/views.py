from django.shortcuts import render
from rest_framework import viewsets
from restapi.models import Departamento, Ciudad, Identificacion, Ciudadano
from restapi.serializers import *
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader

#Generar PDF
from io import BytesIO
from reportlab.platypus import SimpleDocTemplate, Paragraph, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Table

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
	requerido = request.GET.get('requerido')

	if requerido == '1':
		lista_ciudadanos = Ciudadano.objects.filter(requerido=True).order_by('-apellidos')
	elif requerido == '0':
		lista_ciudadanos = Ciudadano.objects.filter(requerido=False).order_by('-apellidos')
	elif requerido == None:
		lista_ciudadanos = Ciudadano.objects.order_by('-apellidos')


	context = {'lista_ciudadanos':lista_ciudadanos, 'requerido':requerido}

	return render(request, 'reg_ciudadanos/index.html', context)


def ciudadano_detail(request, ciudadano_id):
	return HttpResponse("Pagina para visualizar el detalle del ciudadano_id: %s" % ciudadano_id)


# Generar reporte en PDF
# https://docs.djangoproject.com/en/1.11/howto/outputting-pdf/
def generar_pdf(request):

	requerido = request.GET.get('requerido')
	styles = getSampleStyleSheet()

	if requerido == '1':
		header = Paragraph("Listado de Ciudadanos Requeridos", styles['Heading1'])
		allciudadanos = [( p.identificacion, p.apellidos, p.nombres, p.requerido) for p in Ciudadano.objects.filter(requerido=True).order_by('-identificacion')]
	elif requerido == '0':
		header = Paragraph("Listado de Ciudadanos NO Requeridos", styles['Heading1'])
		allciudadanos = [( p.identificacion, p.apellidos, p.nombres, p.requerido) for p in Ciudadano.objects.filter(requerido=False).order_by('-identificacion')]
	else:
		header = Paragraph("Listado de todos los Ciudadanos", styles['Heading1'])
		allciudadanos = [( p.identificacion, p.apellidos, p.nombres, p.requerido) for p in Ciudadano.objects.order_by('-identificacion')]


	#print "Genero el PDF"
	response = HttpResponse(content_type='application/pdf')
	pdf_name = "reporte_ciudadanos.pdf"
	# la linea 66 es por si deseas descargar el pdf a tu computadora
	# response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name
	buff = BytesIO()
	doc = SimpleDocTemplate(buff,
                            pagesize=letter,
                            rightMargin=40,
                            leftMargin=40,
                            topMargin=60,
                            bottomMargin=18,
                            )
	ciudadanos = []
	ciudadanos.append(header)
	headings = ('Identificacion', 'Apellidos', 'Nombres', 'Requerido')
	print (allciudadanos)

	t = Table([headings] + allciudadanos)
	t.setStyle(TableStyle(
        [
            ('GRID', (0, 0), (4, -1), 1, colors.dodgerblue),
            ('LINEBELOW', (0, 0), (-1, 0), 2, colors.darkblue),
            ('BACKGROUND', (0, 0), (-1, 0), colors.dodgerblue)
        ]
    ))
	ciudadanos.append(t)
	doc.build(ciudadanos)
	response.write(buff.getvalue())
	buff.close()
	return response


@csrf_exempt
def consulta_ciudadano(request):
	# La peticion debe ser en metodo GET
	if request.method == "GET":
		identificacion = request.GET.get("identificacion")

		try:
			ciudadano = Ciudadano.objects.get(identificacion=identificacion);
			return JsonResponse({'status':'ok', 'response':'Consulta de ciudadano', 'nombres':ciudadano.nombres,
				'apellidos':ciudadano.apellidos, 'requerido':ciudadano.requerido})
		except Exception as e:
			return JsonResponse({'status':'error', 'response':'Ciudadano no se encuentra en la base de datos o: ' + str(e)})