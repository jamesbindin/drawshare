from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from .models import Group, Post, Comment
from .forms import CreateProfileForm, LoginForm, NewPostForm, NewCommentForm, NewGroupForm
from django.views.generic import ListView

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


class GroupsList(ListView):
    model = Group


class GroupPostList(ListView):
    model = Post

    def get_queryset(self):
        self.group = get_object_or_404(Group, pk=self.kwargs['pk'])
        return Post.objects.filter(group=self.group)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['group'] = self.group
        return context


class PostCommentList(ListView):
    model = Comment

    def get_queryset(self):
        self.post = get_object_or_404(Post, pk=self.kwargs['pk'])
        return Comment.objects.filter(post=self.post)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['post'] = self.post
        return context


def new_post_view(request, user_pk, group_pk):
    if request.method == 'POST':
        form = NewPostForm(request.POST, request.FILES)
        if form.is_valid():
                user = User.objects.filter(pk=user_pk)[0]
                group = Group.objects.filter(pk=group_pk)[0]
                title = form.cleaned_data['title']
                content = form.cleaned_data['content']
                Post.objects.create(user=user, group=group, title=title, content=content)
                return redirect('posts', pk=group_pk)
    else:
        form = NewPostForm()

    return render(request, 'drawapp/new_post.html', {'form': form })


def new_comment_view(request, user_pk, post_pk):
    if request.method == 'POST':
        form = NewCommentForm(request.POST)
        if form.is_valid():
                user = User.objects.filter(pk=user_pk)[0]
                post = Post.objects.filter(pk=post_pk)[0]
                content = form.cleaned_data['content']
                Comment.objects.create(user=user, post=post, content=content)
                return redirect('comments', post_pk)
    else:
        form = NewCommentForm()
    return render(request, 'drawapp/new_comment.html', {'form': form })


def new_group_view(request, user_pk):
    if request.method == 'POST':
        form = NewGroupForm(request.POST)
        if form.is_valid():
                user = User.objects.filter(pk=user_pk)[0]
                name = form.cleaned_data['name']
                description = form.cleaned_data['description']
                Group.objects.create(user=user, name=name, description=description)
                return redirect('groups')
    else:
        form = NewGroupForm()
    return render(request, 'drawapp/new_group.html', {'form': form })


def sketch_view(request):
    return render(request, 'drawapp/sketch.html')
