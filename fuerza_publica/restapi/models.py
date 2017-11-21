#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Agente(models.Model):
	"""docstring for Agente"""
	## user tiene usuario, email y password
	user = models.OneToOneField(User, on_delete=models.CASCADE,blank=True,null=True)
	identificacion = models.CharField(max_length=100,unique=True, verbose_name='Identificacion')
	nombres = models.CharField(max_length=100, blank=True,null=True, verbose_name='Nombres')
	apellidos = models.CharField(max_length=100, blank=True,null=True, verbose_name='Apellidos')
	fuerza_publica = models.CharField(max_length=100, blank=True,null=True, verbose_name='Fuerza Publica')
	rango = models.CharField(max_length=100, blank=True,null=True, verbose_name='Rango')
	id_fp = models.CharField(max_length=100, blank=True,null=True, verbose_name='ID Fuerza')
	email = models.EmailField(max_length=100, blank=True,null=True, verbose_name='Correo electronico')
	def __str__(self):
		return self.nombres + ' ' + self.apellidos
		