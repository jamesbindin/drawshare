
from django.urls import path, include
from drawapp import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.create_user, name='create_account'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('groups/', views.GroupsList.as_view(), name='groups'),
    path('posts/<pk>/', views.GroupPostList.as_view(), name='posts'),
    path('comments/<pk>/', views.PostCommentList.as_view(), name='comments'),
    path('newpost/<user_pk>/<group_pk>/', views.new_post_view, name='new_post'),
    path('newcomment/<user_pk>/<post_pk>/', views.new_comment_view, name='new_comment'),

    ]
