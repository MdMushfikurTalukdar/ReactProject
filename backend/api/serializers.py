from rest_framework import serializers
from .models import User
class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ('registration_number', 'role', 'password','password2',)
        extra_kwargs = {'password': {'write_only':True}}
#validate password
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError(f"password and confirm don't match")
        return attrs
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)