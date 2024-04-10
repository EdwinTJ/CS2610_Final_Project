import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import "../../../styles.css"
export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/products/");
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      } else {
        console.error("Failed to fetch products.");
      }
    }
    fetchProducts();
  }, []);

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