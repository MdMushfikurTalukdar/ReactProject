from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

#custom user manager
class MyUserManager(BaseUserManager):
    def create_user(self, registration_number, password=None, password2=None,role =None):
        """
        Creates and saves a User with the given registration
        number and password.
        """
        if not registration_number:
            raise ValueError("Users must have an registration number")

        user = self.model(
            registration_number=self.normalize_registration_number(registration_number),
            role=role
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, registration_number, password=None,):
        """
        Creates and saves a superuser with the given registration
        number and password.
        """
        user = self.create_user(
            registration_number,
            password=password,
            role='Admin',
        )
        user.is_admin = True
        user.role = "admin"
        user.save(using=self._db)
        return user

    def normalize_registration_number(self, registration_number):
        # Normalization logic here
        return registration_number.strip().upper()
#custom user model
class User(AbstractBaseUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    ]
    registration_number = models.CharField(
        verbose_name="registration number",
        max_length=10, unique=True,
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = MyUserManager()

    USERNAME_FIELD = "registration_number"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.registration_number

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin