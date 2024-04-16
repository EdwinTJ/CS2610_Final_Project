import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import "../../../styles.css"
import {toast} from "sonner"
import { FadeLoader } from "react-spinners";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`/products/?page=${currentPage}`);
      const data = await response.json();
      if (data.success === true) {
        setLoading(true);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      }else {
        toast.error(data.error || "Failed to fetch products.");
      }
      if(response.status === 400){
        toast.error(data.error || "Invalid page number");
      }
     

    }
    fetchProducts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

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
        <section className="pagination">
          <a onClick={handlePreviousPage} style={{ cursor: "pointer" }}>&laquo;</a>
          {[...Array(totalPages).keys()].map(number =>(
            <a 
            key={number + 1}
            onClick={()=> setCurrentPage(number +1)}
            className={currentPage ===number + 1 ? "active" : ""}
            style={{cursor : "pointer"}}
            >
              {number + 1}
            </a>
          ))}
          <a onClick={handleNextPage} style={{ cursor: "pointer" }}>&raquo;</a>

        </section>
      </div>
    </div>
  )
}