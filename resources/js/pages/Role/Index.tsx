import axios from 'axios';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const RoleIndex = () => {
    const { props } = usePage();

    const roles = props.roles || {};
    const flash = props.flash || {};

    const data = roles.data || [];
    const links = roles.links || [];

    const canCreate = true;
    const canEdit = true;
    const canDelete = true;

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this role?')) return;

        try {
            await axios.delete(`/roles/${id}`);
            location.reload(); // or Inertia.reload()
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <AppLayout>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Roles</h2>
                    {canCreate && (
                        <Link href="/roles/create" className="px-4 py-2 bg-slate-500 text-white rounded">
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
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Role Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Permissions</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center">
                                        No roles found.
                                    </td>
                                </tr>
                            ) : (
                                data.map((role: any, index: number) => (
                                    <tr key={role.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 border-b">{index + 1}</td>
                                        <td className="px-6 py-4 border-b">{role.name}</td>
                                        <td className="px-6 py-4 border-b">
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions.map((perm: any) => (
                                                    <span
                                                        key={perm.id}
                                                        className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
                                                    >
                                                        {perm.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b">
                                            <div className="flex gap-2">

                                                <Link
                                                    href={`/roles/${role.id}/edit`}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                                >
                                                    ✏️
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(role.id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                                >
                                                    🗑️
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="mt-4 flex flex-wrap gap-2 px-4 pb-4">
                        {links.map((link: any, index: number) => (
                            <Link
                                key={index}
                                href={link.url || ''}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 border rounded text-sm ${link.active
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

export default RoleIndex;
