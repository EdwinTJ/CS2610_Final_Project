import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cookie from "cookie";
import {toast} from "sonner";
export const DeleteProduct = () => {
  const { id } = useParams(); // Access the ID from the URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const productID = parseInt(id); // Convert the ID to an integer using
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/product/${productID}/`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data.product);
        } else {
          toast.error("Failed to fetch product.");
        }
      } catch (error) {
        toast.error("Failed to fetch product.");

      }
    }
    fetchProduct();
  }, [id]);

  async function deleteProduct() {
    const { csrftoken } = cookie.parse(document.cookie);
    try {
      const response = await fetch(`/product/delete/${productID}/`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": csrftoken
        }
      });
      if (response.ok) {
        toast.success("Product deleted successfully.");
        navigate("/"); // Redirect to home page after successful deletion
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      toast.error("Error deleting product:");
    }
  }

  function handleDelete() {
    deleteProduct();
  }
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <label>Product Name:</label>
      <input type="text" value={product.name} readOnly />
      <label>Description:</label>
      <textarea value={product.description} readOnly />
      <label>Quantity:</label>
      <input type="number" value={product.quantity} readOnly />
      <div>
        <p>Are you sure you want to delete this product?</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};