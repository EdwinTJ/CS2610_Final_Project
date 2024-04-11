from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('products/', view=views.products, name="products"),
    path('product/<int:id>/', view=views.product, name="product"),
    path('addproduct/new/', view=views.addProduct, name="addProduct"),
    path('product/edit/<int:id>/', view=views.editProduct, name="editProduct"),
    path('product/delete/<int:id>/', view=views.deleteProduct, name="deleteProduct"),
    path('user/', view=views.user_info, name="userinfo"),
]