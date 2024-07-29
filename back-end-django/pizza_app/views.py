from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import LocationSerializer, IngredientSerializer, PizzaSerializer, ToppingSerializer
from .models import Ingredient, Location, Pizza, Topping

# Create your views here.

# Ingredient Views
class IngredientList(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [AllowAny]

class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [AllowAny]

# Topping Views
class ToppingList(generics.ListCreateAPIView):
    queryset = Topping.objects.all()
    serializer_class = ToppingSerializer
    permission_classes = [AllowAny]


class ToppingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topping.objects.all()
    serializer_class = ToppingSerializer
    permission_classes = [AllowAny]

# Location Views
class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [AllowAny]

class LocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [AllowAny]

# Pizza Views
class PizzaList(generics.ListCreateAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
    permission_classes = [AllowAny]

class PizzaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
    permission_classes = [AllowAny]
    
# # PizzaLeftTopping Views
# class PizzaLeftToppingList(generics.ListCreateAPIView):
#     queryset = PizzaLeftTopping.objects.all()
#     serializer_class = PizzaLeftToppingSerializer

# class PizzaLeftToppingDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = PizzaLeftTopping.objects.all()
#     serializer_class = PizzaLeftToppingSerializer

# # PizzaRightTopping Views
# class PizzaRightToppingList(generics.ListCreateAPIView):
#     queryset = PizzaRightTopping.objects.all()
#     serializer_class = PizzaRightToppingSerializer

# class PizzaRightToppingDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = PizzaRightTopping.objects.all()
#     serializer_class = PizzaRightToppingSerializer