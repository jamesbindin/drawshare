from django import forms
from django.contrib.auth.models import User
from .models import Group, Post, Comment


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


class NewPostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'image']


class NewCommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']


class NewGroupForm(forms.ModelForm):
    class Meta:
        model = Group
        fields = ['name', 'description']
