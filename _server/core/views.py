from django.shortcuts import render,redirect
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import  Product

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

@login_required
def index(req):
    user = req.user
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0],
        "user": user,
    }
    print(user)
    return render(req, "core/index.html", context)

@login_required
def products(req):
    products = Product.objects.all()
    return JsonResponse({"products": list(products.values())})

@login_required
def product(req,id):
    product = Product.objects.get(id=id)
    data = {
        "name": product.name,
        "description": product.description,
        "quantity": product.quantity
    }
    return JsonResponse({"product": data})

@login_required
def addProduct(req):
   print(req.method)
   if req.method == "POST":
        body =  json.loads(req.body)
        product = Product.objects.create(
            name=body["name"],
            description=body["description"],
            quantity=body["quantity"]
        )
        product.save()
        print(body)
        print("user", req.user)
        return JsonResponse({"success": True})
   return JsonResponse({"success": False})

@login_required
def deleteProduct(req, id):
    product = Product.objects.get(id=id)
    product.delete()
    return JsonResponse({"success": True})

@login_required
def editProduct(req, id):
    if req.method == "PATCH":
        body = json.loads(req.body)
        try:
            product = Product.objects.get(id=id)
            product.name = body["name"]
            product.description = body["description"]
            product.quantity = body["quantity"]
            product.save()
            return JsonResponse({"success": True})
        except Product.DoesNotExist:
            return JsonResponse({"success": False, "error": "Product not found"})
    return JsonResponse({"success": False, "error": "Invalid request method"})
