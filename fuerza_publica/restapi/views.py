
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from restapi.serializers import AgenteSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from restapi.models import Agente
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.validators import validate_email
from django.core.mail import send_mail
import random
import string
import json

# Create your views here.
class AgenteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Agente.objects.all()
    serializer_class = AgenteSerializer
    permission_classes = (IsAdminUser,)


@csrf_exempt
def add_agente(request):	
	"""
	Lista de tenderos dada una coordenada
	:param request, 0point: POINT(-74.536610 4.719120):
	:return json(tenderos):
	"""
	if request.method == "POST":

		identificacion = request.POST.get("identificacion")
		nombres = request.POST.get("nombres")
		apellidos = request.POST.get("apellidos")
		fuerza_publica = request.POST.get("fuerza_publica")
		rango = request.POST.get("rango")
		id_fp = request.POST.get("id_fp")
		email = request.POST.get("email")
		#password = request.POST.get("password")
		try:
			Agente.objects.get(email=email)
			return JsonResponse({'status': 'error','response': 'El correo electronico ya se encuentra en uso.'})
		except:
			try:
				# Se valida el correo electronico
				validate_email(email)
				valid_email = True
				# Si la identificacion existe pero no el EMAIL se crea un nuevo agente y se asigna una contrasena password
				# Se busca la identificacion y se crea un agente
				agente = Agente.objects.get(identificacion=identificacion)
				# Se asignar un nombre de usuario pero que no se usara
				username = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(10))
				# Se genera una contrasena para el nuevo agente segun el documento 6 DIGITOS, MINIMO UNA MAYUSCULA, UNA MINUSCULA Y UN NUMERO
				# No se agregan algunos caracteres para no confundir al agente al recibir el email
				# i, l, I, y 1 (i minuscula, l minuscula, I mayuscula ni numero 1)
				# o, O, and 0 (o minuscula, o mayuscula y numero 0)
				password = User.objects.make_random_password(length=6, allowed_chars='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789')
				user = User.objects.create_user(username, email, password)
				agente.nombres = nombres
				agente.apellidos = apellidos
				agente.fuerza_publica = fuerza_publica
				agente.rango = rango
				agente.id_fp = id_fp
				agente.email = email
				# se almacena el nuevo agente
				agente.save()

				# Se envia un email
				send_mail(
					'Cristian de Consulta ciudadano - Fuerza Publica',
					'Buenas, ' + rango + ' ' + apellidos + ' ' + nombres + '.' +
					'\n\nHa recibido este correo por que se ha registrado en Consulta Ciudadano.'+
					'\nA continuacion se muestra su informacion de inicio de sesion:' +
					'\n\n\n<b>Usuario:</b> ' + email +
					'\n<b>Contrasena:</b> ' + password,
					'cristian.izaquita@gmail.com',
					[email],
					fail_silently=False,
				)

				return JsonResponse({'status':'ok', 'response':'Usuario creado.', 'email':agente.email, 'password':password})

			except Exception as e:
				return JsonResponse({'status':'error', 'response':'Ha ocurrido un error: ' + str(e)})
	else:
		return JsonResponse({'status':'error', 'response':'Metodo de peticion no es POST'})

