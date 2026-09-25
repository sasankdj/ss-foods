import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
const AdminUsers = () => {

    const [users, setUsers] = useState([]);

    const token = localStorage.getItem("token");

    const fetchUsers = async () => {

        try {

            const { data } = await axios.get(
                `${API_URL}/auth/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(data);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {

        if (!window.confirm("Delete User?")) {
            return;
        }

        try {

            await axios.delete(
                `${API_URL}/auth/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("User Deleted");

            fetchUsers();

        } catch (error) {

            toast.error("Failed");

        }
    };

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Users
            </h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                ID
                            </th>

                            <th className="p-4 text-left">
                                Username
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Role
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map(user => (

                            <tr
                                key={user.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    {user.id}
                                </td>

                                <td className="p-4">
                                    {user.username}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">

                                    <span className={`px-3 py-1 rounded-full text-white ${
                                        user.role === "ADMIN"
                                            ? "bg-purple-600"
                                            : "bg-green-600"
                                    }`}>
                                        {user.role}
                                    </span>

                                </td>

                                <td className="p-4">

                                    <button
                                        onClick={() =>
                                            deleteUser(user.id)
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

export default AdminUsers;