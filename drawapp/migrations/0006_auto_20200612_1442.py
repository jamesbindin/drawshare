# Generated by Django 3.0.6 on 2020-06-12 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drawapp', '0005_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images'),
        ),
    ]