import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cookie from "cookie";
import {toast} from "sonner";
import { FadeLoader ,BeatLoader} from "react-spinners";
export const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const productID = parseInt(id);
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

  async function updateProduct(e) {
    e.preventDefault();
    setLoading(true);
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
      const data = await response.json();
      if (data.success === true) {
        toast.success("Product updated successfully.");
        navigate("/"); // Redirect to home page after successful update
      } else {
        toast.error(data.error || "Failed to update product.");
      }
    } catch (error) {
      toast.error("Error updating product:");
    }
    setLoading(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
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
      <h1 className="title">Edit Product</h1>
      <form onSubmit={updateProduct}>
        <label>Product Name:</label>
        <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
        <label>Description:</label>
        <textarea name="description" value={editedProduct.description} onChange={handleChange} />
        <label>Quantity:</label>
        <input type="number" name="quantity" value={editedProduct.quantity} onChange={handleChange} />
        {loading ? (
          <div style={{display : "flex"}}>
            <BeatLoader
              color={"#123abc"}
              loading={true}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
        </div>
        ):
        (<button type="submit" className="button">Save</button>)}
      </form>
    </div>
  );
};
