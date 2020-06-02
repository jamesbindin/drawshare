from django import forms
from django.contrib.auth.models import User

class CreateProfileForm(forms.ModelForm):
    password_confirm = forms.CharField(widget=forms.PasswordInput())
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        widgets = {'password': forms.PasswordInput(),
                   'email': forms.EmailInput()}

class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.widgets.PasswordInput)
