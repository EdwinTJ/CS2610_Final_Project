import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cookie from "cookie";

import {toast} from "sonner"
import CircleLoader from "react-spinners/CircleLoader";

export const ViewProduct = () => {
    const { id } = useParams(); // Access the ID from the URL
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

  const productID = parseInt(id); // Convert the ID to an integer using
  useEffect(() => {
    async function fetchProduct() {
        const response = await fetch(`/product/${productID}/`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data.product);
          setEditedProduct(data.product);
        } else {
          toast.error("Failed to fetch product."); 
        }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return(
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircleLoader
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
    <div>
    <h1>Product Details</h1>
    <p><strong>Name:</strong> {product.name}</p>
    <p><strong>Description:</strong> {product.description}</p>
    <p><strong>Quantity:</strong> {product.quantity}</p>
  </div>
  );
};
