
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
from django.contrib.auth import authenticate
from django.views.decorators.clickjacking import xframe_options_exempt

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

@xframe_options_exempt
@csrf_exempt
def add_agente(request):
	"""
	Crear nuevo agente de la fuerza publica
	:param identificacion, nombres, apellidos, fuerza_publica, rango, id_fp, email
	:return json(succes or error):
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
				agente.user = user
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
					'Admin de Consulta Ciudadano - Fuerza Publica',
					'Buenas, ' + rango + ' ' + apellidos + ' ' + nombres + '.' +
					'\n\nHa recibido este correo por que se ha registrado en Consulta Ciudadano.'+
					'\nA continuacion se muestra su informacion de inicio de sesion:' +
					'\n\n\nUsuario: ' + email +
					'\nContrasena: ' + password +
					'\n\n\nCordial saludo,\nStaff de Consulta Ciudadano.',
					'cristian.izaquita@gmail.com',
					[email],
					fail_silently=False,
				)

				return JsonResponse({'status':'ok', 'response':'Usuario creado.', 'email':agente.email, 'password':password})

			except Exception as e:
				return JsonResponse({'status':'error', 'response':'Ha ocurrido un error: ' + str(e)})
	else:
		return JsonResponse({'status':'error', 'response':'Metodo de peticion no es valido.'})

@xframe_options_exempt
@csrf_exempt
def login(request):
	"""
	Validar Login
	:param email, password
	:return json(succes or error):
	"""
	if request.method == "POST":
		email = request.POST.get("email")
		password = request.POST.get("password")

		try:
			agente = Agente.objects.get(email=email)
		except:
			return JsonResponse({'status':'error','response':'Email no encontrado.'})
		agente_user = agente.user
		user = authenticate(username=agente_user.username, password=password)

		if user is not None:
			return JsonResponse({'status':'ok', 'response':'Credenciales correctas.', 'nombres':agente.nombres, 'apellidos':agente.apellidos, 'rango':agente.rango})
		else:
			return JsonResponse({'status':'error','response':'Credenciales incorrectas.'})

		#validate_email(email)
		#valid_email = True
		#if(email):
		#	try:
		#		user = User.objects.get(email=email,password=password)

		#		return JsonResponse({'status':'ok', 'response':'Credenciales correctas.', 'nombres':agente})
			
		#	except ShopKeeper.DoesNotExist:
		#		return JsonResponse({'status':'error','response':'Credenciales incorrectas.'})
	else:
		return JsonResponse({'status':'error', 'response':'Metodo de peticion no es valido.'})



@xframe_options_exempt
@csrf_exempt
def recuperar_password(request):
	"""
	Recuperar contrasena
	:param email
	:return json(succes or error):
	"""
	if request.method == "POST":
		email = request.POST.get("email")

		try:
			agente = Agente.objects.get(email=email)
		except:
			return JsonResponse({'status':'error','response':'Email no encontrado.'})
		try:	
			password = agente.user.password
			username = agente.user.username
			rango = agente.rango
			apellidos = agente.apellidos
			nombres = agente.nombres


			# Se envia un email
			send_mail(
				'Admin de Consulta Ciudadano - Fuerza Publica',
				'Buenas, ' + rango + ' ' + apellidos + ' ' + nombres + '.' +
				'\n\nHa recibido este correo por que ha solicitado la recuperacion de su contrasena en Consulta Ciudadano.'+
				'\nA continuacion se muestra su contrasena:' +
				'\n\n\nUsuario: ' + username +
				'\nEmail: ' + email +
				'\nContrasena: ' + password +
				'\n\n\nCordial saludo,\nStaff de Consulta Ciudadano.',
				'cristian.izaquita@gmail.com',
				[email],
				fail_silently=False,
			)

			return JsonResponse({'status':'ok', 'response':'Email enviado.', 'email':agente.email, 'password':password})
		except Exception as e:
			return JsonResponse({'status':'error', 'response':'Ha ocurrido un error: ' + str(e)})
	else:
		return JsonResponse({'status':'error', 'response':'Metodo de peticion no es valido.'})

