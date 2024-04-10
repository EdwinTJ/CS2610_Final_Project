import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cookie from "cookie";
import {toast} from "sonner";
export const EditProduct = () => {
  const { id } = useParams(); // Access the ID from the URL
  const [product, setProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
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

  async function updateProduct() {
    const { csrftoken } = cookie.parse(document.cookie);
    try {
      const response = await fetch(`/product/edit/${productID}/`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": csrftoken
        },
        body: JSON.stringify(editedProduct)
      });
      if (response.ok) {
        toast.success("Product updated successfully.");
        navigate("/"); // Redirect to home page after successful update
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      toast.error("Error updating product:");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateProduct();
  }
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
        <label>Description:</label>
        <textarea name="description" value={editedProduct.description} onChange={handleChange} />
        <label>Quantity:</label>
        <input type="number" name="quantity" value={editedProduct.quantity} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
