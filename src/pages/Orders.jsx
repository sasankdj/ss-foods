import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext";

const Orders = () => {
    const boxIcon =
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

    const { Token,navigate } = useContext(MyContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/order/getOrders",
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                }
            );

            setOrders(res.data);
            console.log(res.data);
            
        } catch (error) {
            console.log(error);
        }
    };
    const handleClick=(e)=>{
        console.log(e);
        
        navigate(`/track/3`)
    }
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-8">
                My Orders
            </h1>

            {orders.length === 0 ? (
                <div className="text-center text-gray-500">
                    No orders found
                </div>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-xl p-6 mb-6 shadow-sm bg-white"
                    >
                        {/* Order Header */}
                        <div onClick={()=>handleClick()}
                        className="flex flex-wrap justify-between gap-4 border-b pb-4 mb-4">
                            <div>
                                <p className="font-semibold">
                                    Order #{order.id}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(
                                        order.orderDate
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold text-lg">
                                    ₹{order.totalAmount}
                                </p>
                                <span className="inline-block px-3 py-1 mt-1 text-sm rounded-full bg-blue-100 text-blue-700">
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="space-y-4">
                            {order.items?.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4"
                                >
                                    <img
                                        src={
                                            item.product.imageUrl ||
                                            boxIcon
                                        }
                                        alt={item.product.name}
                                        className="w-16 h-16 rounded border object-cover"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-medium">
                                            {item.product.name}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <div className="font-medium">
                                        ₹
                                        {item.price *
                                            item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;
