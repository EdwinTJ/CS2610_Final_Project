import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cookie from "cookie";

export const DeleteProduct = () => {
  const { id } = useParams(); // Access the ID from the URL
  const [success, setSuccess] = useState(false);
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
          console.error("Failed to fetch product.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
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
        setSuccess(true);
        navigate("/"); // Redirect to home page after successful deletion
      } else {
        console.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
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
      {/* <h1>{product.name}</h1> */}
      <label>Description:</label>
      <textarea value={product.description} readOnly />
      <label>Quantity:</label>
      <input type="number" value={product.quantity} readOnly />
      {/* <p>{product.description}</p>
      <p>{product.quantity}</p> */}
      <div>
        <p>Are you sure you want to delete this product?</p>
        <button onClick={handleDelete}>Yes, delete</button>
      </div>
    </div>
  );
};
