from django.contrib import admin
from .models import Ingredient, Location, Pizza, Topping
# PizzaRightTopping, PizzaLeftTopping

admin.site.register(Ingredient)
admin.site.register(Topping)
admin.site.register(Location)
admin.site.register(Pizza)

# admin.site.register(PizzaLeftTopping)
# admin.site.register(PizzaRightTopping)

# class PizzaLeftToppingInline(admin.TabularInline):
#     model = PizzaLeftTopping
#     extra = 1

# class PizzaRightToppingInline(admin.TabularInline):
#     model = PizzaRightTopping
#     extra = 1

# class PizzaAdmin(admin.ModelAdmin):
#     inlines = [PizzaLeftToppingInline, PizzaRightToppingInline]


# admin.site.register(Pizza, PizzaAdmin)
