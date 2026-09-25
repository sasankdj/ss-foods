import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
const AdminProducts = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

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

            setProducts(data);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async (id) => {

        if (!window.confirm("Delete Product?")) {
            return;
        }

        try {

            await axios.delete(
                `${API_URL}/api/product/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Product Deleted");

            fetchProducts();

        } catch (error) {

            toast.error("Delete Failed");

        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="p-6">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Products
                </h1>

                <button
                    onClick={() =>
                        navigate("/admin/products/add")
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Product
                </button>

            </div>

            <input
                type="text"
                placeholder="Search Product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-3 rounded w-full mb-6"
            />

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Image
                            </th>

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Category
                            </th>

                            <th className="p-4 text-left">
                                Price
                            </th>

                            <th className="p-4 text-left">
                                Stock
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredProducts.map(product => (

                            <tr
                                key={product.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    <img
                                        src={product.imageUrl}
                                        alt=""
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>

                                <td className="p-4">
                                    {product.name}
                                </td>

                                <td className="p-4">
                                    {product.category}
                                </td>

                                <td className="p-4">
                                    ₹{product.price}
                                </td>

                                <td className="p-4">
                                    {product.stock}
                                </td>

                                <td className="p-4 flex gap-3">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/products/edit/${product.id}`
                                            )
                                        }
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
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

export default AdminProducts;