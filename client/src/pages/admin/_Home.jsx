import {toast} from "sonner";

export const AdminHome = () => {


    const copyToClipboard = async (link) =>{
        navigator.clipboard.writeText(link);
        toast.success("Copy to clipboard");
    };
    return(
        <div className="content">
            <h1 className="title">Admin Home</h1>

            <p>
                Here is a list of important links:
                <ul>
                    <li>
                        <p>Assign user roles,give them permission </p>
                        <a href="http://127.0.0.1:8000/admin/">Users</a>
                        <div>
                        <button 
                        className="button"
                        onClick={()=>copyToClipboard('http://127.0.0.1:8000/admin/')}
                        >Copy</button>
                        </div>
                    </li>
                    <li>
                        <p>Give this link to employees so they can login </p>
                        <a href="http://127.0.0.1:8000/registration/sign_in/?next=/">Login</a>
                        <div>
                        <button 
                        className="button"
                        onClick={()=>copyToClipboard('http://127.0.0.1:8000/registration/sign_in/?next=/')}
                        >Copy</button>
                        </div>
                    </li>
                    <li>
                        <p>Give this link to new user so they can register </p>
                        <a href="http://127.0.0.1:8000/registration/sign_up/">Register</a>
                        <div>
                        <button 
                        className="button"
                        onClick={()=> copyToClipboard('http://127.0.0.1:8000/registration/sign_up/')}
                        >Copy</button>
                        </div>
                    </li>
                </ul>
            </p>
        </div>
    );
};