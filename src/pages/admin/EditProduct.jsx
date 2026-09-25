import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const EditProduct = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({});

    const token = localStorage.getItem("token");

    const fetchProduct = async () => {

        try {

            const { data } = await axios.get(
                `${API_URL}/api/product/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setProduct(data);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `${API_URL}/api/product/${id}`,
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Updated");

            navigate("/admin/products");

        } catch (error) {

            toast.error("Update Failed");

        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

            <h1 className="text-3xl font-bold mb-6">
                Edit Product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    name="name"
                    value={product.name || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="description"
                    value={product.description || ""}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="price"
                    value={product.price || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="stock"
                    value={product.stock || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="category"
                    value={product.category || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <button
                    className="bg-green-600 text-white px-6 py-3 rounded"
                >
                    Update Product
                </button>

            </form>

        </div>
    );
};

export default EditProduct;