import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminOrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    // const [Orders, setOrders] = useState(null);

    const token = localStorage.getItem("token");

    const fetchOrder = async () => {

        try {

            const { data } = await axios.get(
                `http://localhost:8080/order/getOrder/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setOrder(data);
            console.log(data);
            //  const order= await axios.get(
            //     `http://localhost:8080/order/get/${data.order.id}`,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`
            //         }
            //     }
            // );
            // console.log(order.data);
            // setOrders(order.data)
            


        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const updateStatus = async (status) => {

        try {

            await axios.put(
                `http://localhost:8080/order/update/${id}`,
                {},
                {
                    params:{
                        status:status
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Status Updated");

            fetchOrder();

        } catch (error) {

            toast.error("Update Failed");

        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Order #{order.id}
            </h1>

            {/* Customer */}

            <div className="bg-white p-5 rounded-xl shadow mb-6">

                <h2 className="text-xl font-semibold mb-3">
                    Customer Details
                </h2>

                <p>
                    Name: {order.user.username}
                </p>

                <p>
                    Email: {order.user.email }
                </p>

            </div>

            {/* Address */}

            <div className="bg-white p-5 rounded-xl shadow mb-6">

                <h2 className="text-xl font-semibold mb-3">
                    Shipping Address
                </h2>

                <p>{order.user.address}</p>

            </div>

            {/* Products */}

            <div className="bg-white p-5 rounded-xl shadow mb-6">

                <h2 className="text-xl font-semibold mb-3">
                    Ordered Products
                </h2>

                {order.items.map(item => (

                    <div
                        key={item.id}
                        className="flex justify-between border-b py-3"
                    >

                        <span>
                            {item.product.name}
                        </span>

                        <span>
                            Qty : {item.quantity}
                        </span>

                    </div>

                ))}

            </div>

            {/* Status */}

            <div className="bg-white p-5 rounded-xl shadow">

                <h2 className="text-xl font-semibold mb-3">
                    Order Status
                </h2>

                <select
                    value={order.orderStatus}
                    onChange={(e) =>
                        updateStatus(e.target.value)
                    }
                    className="border p-3 rounded"
                >

                    <option value="PENDING">
                        PENDING
                    </option>

                    <option value="CONFIRMED">
                        CONFIRMED
                    </option>

                    <option value="PACKED">
                        PACKED
                    </option>

                    <option value="SHIPPED">
                        SHIPPED
                    </option>

                    <option value="OUT_FOR_DELIVERY">
                        OUT FOR DELIVERY
                    </option>

                    <option value="DELIVERED">
                        DELIVERED
                    </option>

                    <option value="CANCELLED">
                        CANCELLED
                    </option>

                </select>

            </div>

        </div>
    );
};

export default AdminOrderDetails;