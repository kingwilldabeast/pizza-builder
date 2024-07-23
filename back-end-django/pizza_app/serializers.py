from rest_framework import serializers
from .models import Ingredient, Location, Pizza, PizzaRightTopping, PizzaLeftTopping

# from .models import Team, Player


class LocationSerializer(serializers.HyperlinkedModelSerializer):
    # team = serializers.HyperlinkedRelatedField(
    #     view_name='team_detail',
    #     read_only=True
    # )

    # team_id = serializers.PrimaryKeyRelatedField(
    #     queryset=Team.objects.all(),
    #     source='team'
    # )

    class Meta:
        model = Location
        fields = ('id', 'name', 'address', 'image_url')
        
        
class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    # players = PlayerSerializer(
    #     # view_name='player_detail',
    #     many=True,
    #     read_only=True
    # )

    # team_url = serializers.ModelSerializer.serializer_url_field(
    #     view_name='ingredient_detail'
    # )

    class Meta:
       model = Ingredient
       fields = ('id', 'name', 'description', 'image_url', 'half_calories_8_in', 
       'half_calories_12_in', 'half_calories_16_in', 'half_price_8_in', 'half_price_12_in', 'half_price_16_in')

# class ToppingSerializer(serializers.HyperlinkedModelSerializer):
#     ingredient = IngredientSerializer(
#         # view_name='player_detail',
#         many=False,
#         read_only=True
#     )

    # team_url = serializers.ModelSerializer.serializer_url_field(
    #     view_name='ingredient_detail'
    # )

    # ingredient_id = serializers.PrimaryKeyRelatedField(
    #     queryset=Team.objects.all(),
    #     source='team'
    # )

    # class Meta:
    #    model = Topping
    #    fields = ('id', 'name', 'ingredient_id', 'ingredient', 'amount')

class PizzaLeftToppingSerializer(serializers.HyperlinkedModelSerializer):
    ingredient = IngredientSerializer()
        # view_name='player_detail',
        # many=True,
        # read_only=True
    # )

    # team_url = serializers.ModelSerializer.serializer_url_field(
    #     view_name='ingredient_detail'
    # )

    class Meta:
       model = PizzaLeftTopping
       fields = ('id', 'pizza', 'ingredient', 'amount_ounces')

class PizzaRightToppingSerializer(serializers.HyperlinkedModelSerializer):
    ingredient = IngredientSerializer()
        # view_name='player_detail',
        # many=True,
        # read_only=True
    # )

    # team_url = serializers.ModelSerializer.serializer_url_field(
    #     view_name='ingredient_detail'
    # )

    class Meta:
       model = PizzaRightTopping
       fields = ('id', 'pizza', 'ingredient', 'amount_ounces')

class PizzaSerializer(serializers.HyperlinkedModelSerializer):
    left_toppings = PizzaLeftToppingSerializer(many=True)
    right_toppings = PizzaRightToppingSerializer(many=True)

    # team_url = serializers.ModelSerializer.serializer_url_field(
    #     view_name='ingredient_detail'
    # )

    class Meta:
       model = Pizza
       fields = ('id', 'name', 'location_id', 'notes', 'left_toppings', 'right_toppings', 'price', 'calories')
