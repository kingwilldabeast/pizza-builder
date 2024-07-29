# pizza_app/management/commands/seed.py

from django.core.management.base import BaseCommand
from pizza_app.models import Ingredient, Topping, Location, Pizza

# import csv  # If you are importing from a CSV file, otherwise use other libraries as needed

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        # Example of adding data
        self.stdout.write('Seeding data...')

        # Clear existing data if needed
        Ingredient.objects.all().delete()
        Topping.objects.all().delete()
        Location.objects.all().delete()
        Pizza.objects.all().delete()

        Ingredient.objects.create(name='pepperoni', description = 'delicious smoked cured pork', half_calories_8_in = 150, half_calories_12_in = 200, half_calories_16_in = 250, half_price_8_in = 0.5, half_price_12_in = 0.75, half_price_16_in = 1, image_url = 'https://cdn.tasteatlas.com/images/dishes/b05a0af72ad845f3a6abe16143d7853a.jpg?m=facebook')
        Ingredient.objects.create(name='cheese', description = 'soft stringy mozzarella', half_calories_8_in = 150, half_calories_12_in = 200, half_calories_16_in = 250, half_price_8_in = 0.5, half_price_12_in = 0.75, half_price_16_in = 1, image_url = 'https://media.istockphoto.com/id/1434774224/photo/organic-shredded-mozzarella-cheese.jpg?s=612x612&w=0&k=20&c=TSdcP1Yx8eNjhTTEPBRetPdDDGxbCCNnyjpGz6tXaIw=')
        Ingredient.objects.create(name='mushroom', description = 'soft stringy mozzarella', half_calories_8_in = 150, half_calories_12_in = 200, half_calories_16_in = 250, half_price_8_in = 0.5, half_price_12_in = 0.75, half_price_16_in = 1, image_url = 'https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_755864_16915790084046412.jpg')

        Location.objects.create(name = 'West', address = '123 West St', image_url = 'image.png')
        Location.objects.create(name = 'Sanders', address = '367 Sanders Ave', image_url = 'image.png')
      
      
        self.stdout.write(self.style.SUCCESS('Successfully seeded the database.'))


