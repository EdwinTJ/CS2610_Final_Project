import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cookie from "cookie";
import {toast} from "sonner";
import { FadeLoader,BeatLoader } from "react-spinners";
export const DeleteProduct = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
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

  async function deleteProduct(e) {
    e.preventDefault();
    setLoading(true);
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
    setLoading(false);
  }

  // TODO:
  // Ask teacher why this would not work
  // Call it in the form onSubmit
  function handleDelete(e) {
    deleteProduct();
  }

  if (!product) {
    return(
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <FadeLoader
            color={"#123abc"}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
      </div>
 
    );      
  }

  return (
    <div className="content">
      <h1 className="title">Delete Product</h1>
      <form onSubmit={deleteProduct}>
      <label>Product Name:</label>
      <input type="text" value={product.name} readOnly />
      <label>Description:</label>
      <textarea value={product.description} readOnly readonly="readonly"/>
      <label>Quantity:</label>
      <input type="number" value={product.quantity} readOnly readonly="readonly" />
        <p>Are you sure you want to delete this product?</p>
        {loading ? (
          <div style={{ display: "flex"}}>
            <BeatLoader
              color={"#123abc"}
              loading={true}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : 
        (<button type="submit">Delete</button>)}
      </form>
    </div>
  );
};
