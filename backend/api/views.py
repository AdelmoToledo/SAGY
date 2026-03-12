from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "ESTA É UMA PÁGINA DO SISTEMA SÂGI<br><br>EM DESENVOLVIMENTO..."})

# Create your views here.
