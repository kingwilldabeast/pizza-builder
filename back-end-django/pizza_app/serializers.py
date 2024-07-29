from rest_framework import serializers
from .models import Ingredient, Location, Pizza, Topping
# PizzaRightTopping, PizzaLeftTopping

# from .models import Team, Player


class LocationSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Location
        fields = ('id', 'name', 'address', 'image_url')
        
class IngredientSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
       model = Ingredient
       fields = ('id', 'name', 'description', 'image_url', 'half_calories_8_in', 
       'half_calories_12_in', 'half_calories_16_in', 'half_price_8_in', 'half_price_12_in', 'half_price_16_in')

class ToppingSerializer(serializers.HyperlinkedModelSerializer):
    ingredient = IngredientSerializer(read_only=True)


    ingredient_id = serializers.PrimaryKeyRelatedField(
        queryset=Ingredient.objects.all(),
        # source='ingredient_id'
    )

    # ingredient_name = serializers.PrimaryKeyRelatedField(
    #     queryset=Ingredient.objects.all(),
    #     source='name'
    # )

    # pizza = PizzaSerializer(
    # )
    pizza_id = serializers.PrimaryKeyRelatedField(
        queryset=Pizza.objects.all(),
        # source='pizza_id'
    )

    # pizza_id = serializers.PrimaryKeyRelatedField(
    #     queryset=Pizza.objects.all(),
    #     source='pizza'
    # )


    class Meta:
       model = Topping
       fields = ('id', 'name', 
                 'pizza_id', 
                #  'pizza', 
                 'ingredient_id', 
                #  'ingredient_name',
                 'ingredient', 
                 'half_calories_8_in', 
       'half_calories_12_in', 'half_calories_16_in', 'half_price_8_in', 'half_price_12_in', 'half_price_16_in')

    # def get_pizzas(self, obj):
    #         pizzas = obj.pizza_set.all()  # Accessing related pizzas
    #         return PizzaSerializer(pizzas, many=True, read_only=True).data


class PizzaSerializer(serializers.HyperlinkedModelSerializer):

    toppings = ToppingSerializer(many=True, read_only=True)
    topping_ids = serializers.PrimaryKeyRelatedField(
        queryset=Topping.objects.all(),
        # source='toppings',
        many=True,
        write_only=True,
        required=False  # Make the field optional

    )

    class Meta:
       model = Pizza
       fields = ('id', 'name', 'location_id', 'toppings', 'topping_ids', 'notes', 'price', 'calories')

    def create(self, validated_data):
        topping_ids = validated_data.pop('topping_ids', [])
        pizza = Pizza.objects.create(**validated_data)
        for topping_id in topping_ids:
            Topping.objects.filter(id=topping_id).update(pizza=pizza)
        return pizza

    def update(self, instance, validated_data):
        topping_ids = validated_data.pop('topping_ids', [])
        instance.name = validated_data.get('name', instance.name)
        instance.size = validated_data.get('size', instance.size)
        instance.save()

        if topping_ids:
            instance.toppings.clear()
            for topping_id in topping_ids:
                Topping.objects.filter(id=topping_id).update(pizza=instance)

        return instance