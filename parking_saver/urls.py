"""
URL configuration for parking_saver project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from core import views

# Function to serve the manifest.json file
def manifest(request):
    return JsonResponse({
        "name": "Parking Saver",
        "short_name": "Parking Saver",
        "description": "Save and retrieve your parking spot",
        "start_url": "/",
        "display": "standalone",
        "scope": "/",
        "orientation": "any",
        "background_color": "#ffffff",
        "theme_color": "#2196F3",
        "status_bar": "default",
        "icons": [
            {
                "src": "/static/icons/icon-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/static/icons/icon-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "dir": "ltr",
        "lang": "en-US",
        "screenshots": [
            {
                "src": "/static/screenshots/screenshot1.png",
                "sizes": "1080x1920",
                "type": "image/png",
                "form_factor": "wide"
            },
            {
                "src": "/static/screenshots/screenshot2.png",
                "sizes": "1080x1920",
                "type": "image/png"
            }
        ],
        "shortcuts": []
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('', include('pwa.urls')),
    path('manifest.json', manifest),
]
