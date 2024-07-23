from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter


urlpatterns = [
    # Ingredient URLs
    path('ingredients/', views.IngredientList.as_view(), name='ingredient-list'),
    path('ingredients/<int:pk>/', views.IngredientDetail.as_view(), name='ingredient-detail'),

    # # Topping URLs
    # path('toppings/', views.ToppingList.as_view(), name='topping-list'),
    # path('toppings/<int:pk>/', views.ToppingDetail.as_view(), name='topping-detail'),

    # Location URLs
    path('locations/', views.LocationList.as_view(), name='location-list'),
    path('locations/<int:pk>/', views.LocationDetail.as_view(), name='location-detail'),

    # Pizza URLs
    path('pizzas/', views.PizzaList.as_view(), name='pizza-list'),
    path('pizzas/<int:pk>/', views.PizzaDetail.as_view(), name='pizza-detail'),

    # PizzaLeftTopping URLs
    path('pizza-left-toppings/', views.PizzaLeftToppingList.as_view(), name='pizza-left-topping-list'),
    path('pizza-left-toppings/<int:pk>/', views.PizzaLeftToppingDetail.as_view(), name='pizza-left-topping-detail'),

    # PizzaRightTopping URLs
    path('pizza-right-toppings/', views.PizzaRightToppingList.as_view(), name='pizza-right-topping-list'),
    path('pizza-right-toppings/<int:pk>/', views.PizzaRightToppingDetail.as_view(), name='pizza-right-topping-detail'),
]