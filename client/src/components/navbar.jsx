import { Link } from "react-router-dom";
import "../styles.css";
export const Navbar = () => {   
        const logout = async () => {
            const res = await fetch("/registration/logout/", {
                credentials: "same-origin", // include cookies!
              });
          
              if (res.ok) {
                // navigate away from the single page app!
                window.location = "/registration/sign_in/";
              } else {
                // handle logout failed!
              }
        };
        return (
            <>
              <nav className="navbar">
                <div className="nav-links">
                  <Link to="/">Home</Link>
                  <a>Users</a>
                </div>
                <button className="button" onClick={logout}>Logout</button>
              </nav>
            </>
          );
};