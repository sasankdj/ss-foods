import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const Dashboard = () => {

    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);

    const token = localStorage.getItem("token");

    const fetchDashboard = async () => {
        try {

            const { data } = await axios.get(
                `${API_URL}/admin/dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStats(data);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchRecentOrders = async () => {
        try {

            const { data } = await axios.get(
                `${API_URL}/order/get`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRecentOrders(data.slice(0, 5));

        } catch (error) {
            console.log(error);
        }
    };

    const fetchProducts = async () => {
        try {

            const { data } = await axios.get(
               `${API_URL}/api/products`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLowStockProducts(
                data.filter(product => product.stock < 30)
            );

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
        fetchRecentOrders();
        fetchProducts();
    }, []);

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white shadow rounded-xl p-5">
                    <h2 className="text-gray-500">Revenue</h2>
                    <p className="text-3xl font-bold mt-2">
                        ₹{stats.totalRevenue}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-5">
                    <h2 className="text-gray-500">Orders</h2>
                    <p className="text-3xl font-bold mt-2">
                        {stats.totalOrders}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-5">
                    <h2 className="text-gray-500">Products</h2>
                    <p className="text-3xl font-bold mt-2">
                        {stats.totalProducts}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-5">
                    <h2 className="text-gray-500">Users</h2>
                    <p className="text-3xl font-bold mt-2">
                        {stats.totalUsers}
                    </p>
                </div>

            </div>

            {/* Recent Orders */}
            <div className="mt-10 bg-white shadow rounded-xl p-5">

                <h2 className="text-xl font-semibold mb-4">
                    Recent Orders
                </h2>

                <table className="w-full border-collapse">

                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3">Order ID</th>
                            <th className="text-left py-3">Amount</th>
                            <th className="text-left py-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {recentOrders.map(order => (
                            <tr
                                key={order.id}
                                className="border-b"
                            >
                                <td className="py-3">
                                    #{order.id}
                                </td>

                                <td>
                                    ₹{order.totalAmount}
                                </td>

                                <td>
                                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {/* Low Stock Products */}
            <div className="mt-10 bg-white shadow rounded-xl p-5">

                <h2 className="text-xl font-semibold mb-4">
                    Low Stock Products
                </h2>

                <table className="w-full">

                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3">
                                Product
                            </th>

                            <th className="text-left py-3">
                                Stock
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {lowStockProducts.map(product => (
                            <tr
                                key={product.id}
                                className="border-b"
                            >
                                <td className="py-3">
                                    {product.name}
                                </td>

                                <td className="text-red-500 font-bold">
                                    {product.stock}
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Dashboard;