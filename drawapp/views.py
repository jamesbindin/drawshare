from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from .forms import CreateProfileForm

def index(request):
    return render(request, 'drawapp/index.html')

def create_user(request):
    pass_err = None
    if request.method == 'POST':
        form = CreateProfileForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password= form.cleaned_data['password']
            if password == form.cleaned_data['password_confirm']:
                User.objects.create_user(username, email, password)
                return redirect('index')
            else:
                pass_err = 'Passwords Dont Match'
    else:
        form = CreateProfileForm()

    return render(request, 'drawapp/sign_up.html', {'form': form,
                                                    'pass_err': pass_err})
