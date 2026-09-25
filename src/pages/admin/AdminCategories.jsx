import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
const AdminCategories = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    const token = localStorage.getItem("token");

    const fetchCategories = async () => {

        try {

            const { data } = await axios.get(
                `${API_URL}/admin/categories`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCategories(data);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const addCategory = async () => {

        if (!name.trim()) {
            return;
        }

        try {

            await axios.post(
                `${API_URL}/admin/categories`,
                {
                    name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Category Added");

            setName("");

            fetchCategories();

        } catch (error) {

            toast.error("Failed");

        }
    };

    const deleteCategory = async (id) => {

        try {

            await axios.delete(
              `${API_URL}/admin/categories/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Deleted");

            fetchCategories();

        } catch (error) {

            toast.error("Delete Failed");

        }
    };

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Categories
            </h1>

            <div className="flex gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    className="border p-3 rounded flex-1"
                />

                <button
                    onClick={addCategory}
                    className="bg-blue-600 text-white px-5 rounded"
                >
                    Add
                </button>

            </div>

            <div className="bg-white rounded-xl shadow">

                {categories.map(category => (

                    <div
                        key={category.id}
                        className="flex justify-between p-4 border-b"
                    >

                        <span>
                            {category.name}
                        </span>

                        <button
                            onClick={() =>
                                deleteCategory(category.id)
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default AdminCategories;