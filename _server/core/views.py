from django.shortcuts import render,redirect
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import  Product
from .decorators import admin_required
# Import Pagination
from django.core.paginator import Paginator



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
    products = Product.objects.all().order_by("-id")
    pagination = Paginator(products, 4)

    page_number = req.GET.get("page")
    try:
        page_number = int(page_number)
        if page_number < 1 or page_number > pagination.num_pages:
            raise ValueError("Invalid page number")
    except(TypeError, ValueError):
        return JsonResponse({"error": "Invalid page number For Client"}, status=400)

    products_page = pagination.get_page(page_number)
    serialized_products = list(products_page.object_list.values())
    return JsonResponse({
        "success": True,
        "products": serialized_products,
        "totalPages": pagination.num_pages
    })

@login_required
def product(req,id):
    product = Product.objects.get(id=id)
    data = {
        "name": product.name,
        "description": product.description,
        "quantity": product.quantity
    }
    return JsonResponse({"success": True,"product": data})

@login_required
@admin_required
def addProduct(req):
    if req.method == "POST":
        try:
            body =  json.loads(req.body)
            product = Product.objects.create(
            name=body["name"],
            description=body["description"],
            quantity=body["quantity"]
            )
            product.save()
            return JsonResponse({"success": True})
        except KeyError:
            return JsonResponse({"success": False, "error": "Invalid request body"})
    return JsonResponse({"success": False, "error": "Something went wrong"})

@login_required
@admin_required
def deleteProduct(req, id):
    try:
        product = Product.objects.get(id=id)
        product.delete()
        return JsonResponse({"success": True})
    except Product.DoesNotExist:
        return JsonResponse({"success": False, "error": "Product not found"})
    

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
