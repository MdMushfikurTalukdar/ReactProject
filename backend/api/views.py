from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.views import APIView

from .models import UserProfile
from .renderers import UserRenderer
from .serializers import UserRegistrationSerializer,UserLoginSerializer, UserProfileSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
#manually generate token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
# Create your views here.
class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token':token,'message': 'User creation successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            registration_number = serializer.data.get('registration_number')
            password = serializer.data.get('password')
            user = authenticate(registration_number=registration_number,password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token':token,'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': {'non_fields_errors':['registration number or password is Not valid']}}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    renderer_classes = [UserRenderer]
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user.profile
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)