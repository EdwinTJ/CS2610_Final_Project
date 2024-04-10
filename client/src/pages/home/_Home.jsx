import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

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
    <div>
      <Link to="/product/new">Create new product</Link>
      <div>
      <h1>Products</h1>
      <table>
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
                <Link to={`/product/${product.id}`}>View</Link>
                <span> | </span>
                <Link to={`/product/edit/${product.id}`}>Edit</Link>
                <span> | </span>
                <Link to={`/product/delete/${product.id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}