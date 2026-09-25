import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "../context/MyContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddressSelector({ selectedAddress, setSelectedAddress }) {
    const { Token } = useContext(MyContext);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const res = await axios.get(`${API_URL}/checkout`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });
            console.log(res.data);
            
            setAddresses(res.data);

            if (res.data.length > 0) {
                setSelectedAddress(res.data[0]);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading addresses...</p>;
    }

    return (
        <div className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">
                Select Delivery Address
            </h2>

            {addresses.length === 0 ? (
                <p className="text-gray-500">
                    No saved addresses found.
                </p>
            ) : (
                addresses.map((address) => (
                    <label
                        key={address.id}
                        className={`block border rounded-lg p-4 cursor-pointer transition
                        ${
                            selectedAddress?.id === address.id
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-300"
                        }`}
                    >
                        <input
                            type="radio"
                            name="address"
                            checked={selectedAddress?.id === address.id}
                            onChange={() => setSelectedAddress(address)}
                            className="mr-3"
                        />

                        <div>
                            <h3 className="font-semibold">
                                {address.fullName}
                            </h3>

                            <p className="text-sm text-gray-600">
                                {address.address}
                            </p>

                            <p className="text-sm text-gray-600">
                                {address.city}, {address.state} - {address.pincode}
                            </p>

                            <p className="text-sm text-gray-600">
                                {address.phoneNumber}
                            </p>
                        </div>
                    </label>
                ))
            )}
        </div>
    );
}