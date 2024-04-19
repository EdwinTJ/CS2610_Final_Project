import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import "../styles.css";
import { toast } from "sonner";

export const Navbar = () => { 
  const [user,setUser] = useState({
    username: "Guest",
    is_staff: false,
  });  
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

  const getUser = async () => {
    const res = await fetch("/user/", {
      credentials: "same-origin", // include cookies!
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      toast.error(user.error || "Failed to fetch user");
    }

  }; 

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <nav className="navbar">
        <div className="nav-links">
          <span>Welcome, {user.username}</span>
          <Link to="/">Home</Link>
          {user.is_staff && <Link to="/admin">Admin</Link>}

        </div>
        <button className="button" onClick={logout}>Logout</button>
      </nav>
    </>
  );
};