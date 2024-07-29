from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    image_url = models.URLField(blank=True)
    half_calories_8_in = models.IntegerField(default=0)
    half_calories_12_in = models.IntegerField(default=0)
    half_calories_16_in = models.IntegerField(default=0)
    half_price_8_in = models.FloatField(default=0)
    half_price_12_in = models.FloatField(default=0)
    half_price_16_in = models.FloatField(default=0)
    def __str__(self):
        return self.name

class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    image_url = models.URLField(blank=True)
    def __str__(self):
        return self.name   

class Pizza(models.Model):
    name = models.CharField(max_length=100)
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='pizzas')
    notes = models.TextField(max_length=100)
    # left_toppings = models.ManyToManyField(Topping, through='PizzaLeftTopping', related_name='left_toppings')
    # right_toppings = models.ManyToManyField(Topping, through='PizzaRightTopping', related_name='right_toppings')
    price = models.FloatField(default=0)
    calories = models.FloatField(default=0)
    # toppings = models.ManyToManyField(Topping, related_name='pizzas')


    SIZE_8_INCH = '8 inch'
    SIZE_12_INCH = '12 inch'
    SIZE_16_INCH = '16 inch'
    
    SIZE_CHOICES = [
        (SIZE_8_INCH, '8 inch'),
        (SIZE_12_INCH, '12 inch'),
        (SIZE_16_INCH, '16 inch'),
    ]
    
    size = models.CharField(
        max_length=10,
        choices=SIZE_CHOICES,
        default=SIZE_8_INCH,
    )


    def __str__(self):
        return self.name
 
class Topping(models.Model):
    pizza_id = models.ForeignKey(Pizza, on_delete=models.CASCADE, related_name='toppings')
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name='toppings')
    name = models.CharField(max_length=100)
    leftTopping = models.IntegerField(default=0)
    rightTopping = models.IntegerField(default=0)
    half_calories_8_in = models.IntegerField(default=0)
    half_calories_12_in = models.IntegerField(default=0)
    half_calories_16_in = models.IntegerField(default=0)
    half_price_8_in = models.FloatField(default=0)
    half_price_12_in = models.FloatField(default=0)
    half_price_16_in = models.FloatField(default=0)
    def __str__(self):
        return f"{self.ingredient_id.name}"
    
 

   

# class PizzaLeftTopping(models.Model):
#     pizza = models.ForeignKey(Pizza, related_name='left_toppings', on_delete=models.CASCADE)
#     ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, default=1)
#     amount_ounces = models.FloatField(default=0)

#     def __str__(self):
#         return f'{self.ingredient.name} on {self.pizza.name} (Left)'

# class PizzaRightTopping(models.Model):
#     pizza = models.ForeignKey(Pizza, related_name='right_toppings', on_delete=models.CASCADE)
#     ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, default=1)
#     amount_ounces = models.FloatField(default=0)

#     def __str__(self):
#         return f'{self.ingredient.name} on {self.pizza.name} (Right)'


# class PizzaLeftTopping(models.Model):
#     pizza = models.ForeignKey(Pizza, on_delete=models.CASCADE)
#     topping = models.ForeignKey(Topping, on_delete=models.CASCADE)

# class PizzaRightTopping(models.Model):
#     pizza = models.ForeignKey(Pizza, on_delete=models.CASCADE)
#     topping = models.ForeignKey(Topping, on_delete=models.CASCADE)