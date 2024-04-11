
export const AdminHome = () => {


    return(
        <div>
            <h1>Admin Home</h1>

            <p>
                Here is a list of important links:
                <ul>
                    <li>
                        <p>Assign user roles,give them permission </p>
                        <a href="http://127.0.0.1:8000/admin/">Users</a>
                    </li>
                    <li>
                        <p>Give this link to employees so they can login </p>
                        <a href="http://127.0.0.1:8000/registration/sign_in/?next=/">Login</a>
                    </li>
                    <li>
                        <p>Give this link to new user so they can register </p>
                        <a href="http://127.0.0.1:8000/registration/sign_up/">Register</a>
                    </li>
                </ul>

            </p>
        </div>
    );
};