import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        category: ""
    });

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/product",
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Product Added");

            navigate("/admin/products");

        } catch (error) {

            toast.error("Failed");

        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

            <h1 className="text-3xl font-bold mb-6">
                Add Product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    name="name"
                    placeholder="Product Name"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    rows="4"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />
                <input
                    name="imageUrl"
                    placeholder="imageUrl"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />
                <input
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >
                    Add Product
                </button>

            </form>

        </div>
    );
};

export default AddProduct;