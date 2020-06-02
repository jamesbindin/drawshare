from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from .forms import CreateProfileForm, LoginForm

def index(request):
    return render(request, 'drawapp/index.html')

def create_user(request):
    pass_err = None
    if request.method == 'POST':
        form = CreateProfileForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            password2 = form.cleaned_data['password_confirm']
            if password == password2:
                User.objects.create_user(username, email, password)
                return redirect('index')
            else:
                pass_err = 'Passwords Dont Match'
    else:
        form = CreateProfileForm()

    return render(request, 'drawapp/sign_up.html', {'form': form,
                                                    'pass_err': pass_err})

def login_user(request):
    error_mess = None
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')
            else:
                error_mess = 'The details entered were not correct, please try again'
    else:
        form = LoginForm()
    return render(request, 'drawapp/login.html', {'form':form, 'error_mess':error_mess})

def logout_user(request):
    logout(request)
    return render(request, 'drawapp/logout_success.html')
