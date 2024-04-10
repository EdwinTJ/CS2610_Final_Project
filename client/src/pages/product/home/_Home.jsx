import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import "../../../styles.css"
import {toast} from "sonner"
import { FadeLoader } from "react-spinners";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/products/");
      const data = await response.json();
      if (response.ok) {
        setLoading(true);
        setProducts(data.products);
      } else {
        toast.error("Failed to fetch products.");
      }
    }
    fetchProducts();
  }, []);

  if (!loading) {
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
      <Link className="button"to="/product/new">Create new product</Link>
      <div>
      <h1 className="title">Products</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>
                <Link to={`/product/${product.id}`} className="button btn-view">View</Link>
                <span> | </span>
                <Link to={`/product/edit/${product.id}`} className="button btn-edit">Edit</Link>
                <span> | </span>
                <Link to={`/product/delete/${product.id}`} className="button btn-delete">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}