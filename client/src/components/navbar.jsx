import { Link } from "react-router-dom";

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
              <nav>
              <Link to="/">Home</Link>
              <button onClick={logout}>Logout</button>
              </nav>
            </>
          );
};