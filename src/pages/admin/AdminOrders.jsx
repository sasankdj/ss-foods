import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const AdminOrders = () => {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const fetchOrders = async () => {

        try {

            const { data } = await axios.get(
                `${API_URL}/order/get`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setOrders(data);
            console.log(data);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        fetchOrders();
        
    }, []);

    const filteredOrders = orders.filter(order =>
        order.id.toString().includes(search)
    );

    return (
        <div className="p-6">

            <div className="flex justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Orders
                </h1>

                <input
                    type="text"
                    placeholder="Search Order ID"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="border p-2 rounded"
                />

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Order ID
                            </th>

                            <th className="p-4 text-left">
                                Customer
                            </th>

                            <th className="p-4 text-left">
                                Total
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredOrders.map(order => (

                            <tr
                                key={order.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    #{order.id}
                                </td>

                                <td className="p-4">
                                    {order.user.username}
                                </td>

                                <td className="p-4">
                                    ₹{order.totalAmount}
                                </td>

                                <td className="p-4">

                                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                                        {order.status}

                                    </span>

                                </td>

                                <td className="p-4">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/orders/${order.id}`
                                            )
                                        }
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        View
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AdminOrders;