import React from "react";
import NavbarComponent from "./NavbarComponent";
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
    return (
        <div>
            <NavbarComponent />
            <div className="container mt-4">
                {children}
            </div>
        </div>
    )
}

export default Layout;
