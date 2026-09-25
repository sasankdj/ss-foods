import { useContext } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";

const Admin = () => {

    const role= localStorage.getItem("role");
    
    console.log(role);
    
    if (role !== "ADMIN") {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex min-h-screen">

            <div className="w-64 bg-gray-900 text-white p-5">
                <h1 className="text-2xl font-bold mb-6">
                    Admin Panel
                </h1>

                <div className="flex flex-col gap-4">
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/products">Products</Link>
                    <Link to="/admin/orders">Orders</Link>
                    <Link to="/admin/users">Users</Link>
                </div>
            </div>

            <div className="flex-1 p-5">
                <Outlet />
            </div>

        </div>
    );
};

export default Admin;