import axios from 'axios';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const PermissionsPage = () => {
    const { props } = usePage();

    const permissions = props.permissions || {};
    const flash = props.flash || {};

    const data = permissions.data || [];
    const links = permissions.links || [];

    const canCreate = true;
    const canEdit = true;
    const canDelete = true;
    
    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this permission?')) return;

        try {
            await axios.delete(`/permissions/${id}`);
            location.reload(); // Or use Inertia router
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
                        <Link href="/permissions/create" className="px-4 py-2 bg-slate-500 text-white rounded">
                            Create
                        </Link>
                    )}
                </div>

                {flash.success && <div className="mb-4 text-green-600">{flash.success}</div>}
                {flash.error && <div className="mb-4 text-red-600">{flash.error}</div>}

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
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center">
                                        No permissions found.
                                    </td>
                                </tr>
                            ) : (
                                data.map((permission: any) => (
                                    <tr key={permission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 border-b">{permission.id}</td>
                                        <td className="px-6 py-4 border-b">{permission.name}</td>
                                        <td className="px-6 py-4 border-b">
                                            <div className="flex gap-2">
                                                {canEdit && (
                                                    <Link
                                                        href={`/permissions/${permission.id}/edit`}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                                    >
                                                        ✏️
                                                    </Link>
                                                )}
                                                {canDelete && (
                                                    <button
                                                        onClick={() => handleDelete(permission.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded"
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

                    {/* Pagination Links */}
                    <div className="mt-4 flex flex-wrap gap-2 px-4 pb-4">
                        {links.map((link: any, index: number) => (
                            <Link
                                key={index}
                                href={link.url || ''}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 border rounded text-sm ${
                                    link.active
                                        ? 'bg-slate-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PermissionsPage;
