from django.shortcuts import render
from rest_framework import generics
from .serializers import LocationSerializer, IngredientSerializer, PizzaSerializer, PizzaLeftToppingSerializer, PizzaRightToppingSerializer
from .models import Ingredient, Location, Pizza, PizzaLeftTopping, PizzaRightTopping

# Create your views here.

# Ingredient Views
class IngredientList(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

# # Topping Views
# class ToppingList(generics.ListCreateAPIView):
#     queryset = Topping.objects.all()
#     serializer_class = ToppingSerializer

# class ToppingDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Topping.objects.all()
#     serializer_class = ToppingSerializer

# Location Views
class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class LocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

# Pizza Views
class PizzaList(generics.ListCreateAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer

class PizzaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer

# PizzaLeftTopping Views
class PizzaLeftToppingList(generics.ListCreateAPIView):
    queryset = PizzaLeftTopping.objects.all()
    serializer_class = PizzaLeftToppingSerializer

class PizzaLeftToppingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PizzaLeftTopping.objects.all()
    serializer_class = PizzaLeftToppingSerializer

# PizzaRightTopping Views
class PizzaRightToppingList(generics.ListCreateAPIView):
    queryset = PizzaRightTopping.objects.all()
    serializer_class = PizzaRightToppingSerializer

class PizzaRightToppingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PizzaRightTopping.objects.all()
    serializer_class = PizzaRightToppingSerializer