
from django.urls import path, include
from drawapp import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.create_user, name='create_account'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('groups/', views.GroupsList.as_view(), name='groups')
    ]
