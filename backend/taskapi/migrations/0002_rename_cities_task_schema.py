# Generated by Django 4.2.1 on 2023-05-18 08:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('taskapi', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='cities',
            new_name='task_schema',
        ),
    ]
