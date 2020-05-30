
from django.urls import path, include
from drawapp import views

urlpatterns = [
    path('', views.index, name='index'),
    path('', include('django.contrib.auth.urls')),
    path('signup/', views.create_user, name='create_user'),
    ]
