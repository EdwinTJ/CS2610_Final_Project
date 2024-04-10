import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cookie from "cookie";

export const ViewProduct = () => {
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
          setEditedProduct(data.product);
        } else {
          console.error("Failed to fetch product.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <h1>Product Details</h1>
    <p><strong>Name:</strong> {product.name}</p>
    <p><strong>Description:</strong> {product.description}</p>
    <p><strong>Quantity:</strong> {product.quantity}</p>
  </div>
  );
};
