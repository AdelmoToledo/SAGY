import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

User = get_user_model()
if not User.objects.filter(username='Adelmo').exists():
    User.objects.create_superuser('Adelmo', 'Adelmo@hotmail.com', '123456')
    print("Superusuário criado com sucesso!")
