from django.contrib import admin

# Register your models here.

from .models import Departamento, Ciudad, Identificacion, Ciudadano

# Register your models here.


admin.site.register(Departamento)
admin.site.register(Ciudad)
admin.site.register(Identificacion)
admin.site.register(Ciudadano)