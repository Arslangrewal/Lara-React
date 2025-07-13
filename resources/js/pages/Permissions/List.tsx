import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AppLayout from '@/layouts/app-layout';


const PermissionsPage = () => {
    const [permissions, setPermissions] = useState([]);
    const [canCreate, setCanCreate] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [canDelete, setCanDelete] = useState(false);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('/api/permissions'); // Adjust to your actual endpoint
            setPermissions(response.data.permissions);
            setCanCreate(response.data.canCreate);
            setCanEdit(response.data.canEdit);
            setCanDelete(response.data.canDelete);
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this permission?')) return;

        try {
            await axios.delete(`/api/permissions/${id}`);
            setPermissions(permissions.filter((perm) => perm.id !== id));
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <AppLayout>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Permissions</h2>
                    {canCreate && (
                        <Link to="/permissions/create" className="px-4 py-2 bg-slate-500 text-white rounded">
                            Create
                        </Link>
                    )}
                </div>

                <div className="overflow-x-auto bg-white shadow rounded">
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">#</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center">
                                        No permissions found.
                                    </td>
                                </tr>
                            ) : (
                                permissions.map((permission) => (
                                    <tr key={permission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 border-b">{permission.id}</td>
                                        <td className="px-6 py-4 border-b">{permission.name}</td>
                                        <td className="px-6 py-4 border-b">
                                            <div className="flex gap-2">
                                                {canEdit && (
                                                    <Link
                                                        to={`/permissions/edit/${permission.id}`}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                                        title="Edit"
                                                    >
                                                        ✏️
                                                    </Link>
                                                )}
                                                {canDelete && (
                                                    <button
                                                        onClick={() => handleDelete(permission.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </AppLayout>
    );
};

export default PermissionsPage;
