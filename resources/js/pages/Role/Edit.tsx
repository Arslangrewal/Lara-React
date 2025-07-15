import { FormEvent } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

export default function EditRole() {
    const { role, permissions } = usePage<{ role: Role; permissions: Permission[] }>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: role.permissions.map((perm) => perm.name),
    });

    const handleCheckboxChange = (permission: string) => {
        if (data.permissions.includes(permission)) {
            setData(
                'permissions',
                data.permissions.filter((perm) => perm !== permission)
            );
        } else {
            setData('permissions', [...data.permissions, permission]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/roles/${role.id}`);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
            <Head title="Edit Role" />

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Edit Role</h2>
                <Link
                    href="/roles"
                    className="text-sm text-blue-600 hover:underline"
                >
                    ← Back to Roles
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-medium text-sm text-gray-700">Role Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block font-medium text-sm text-gray-700 mb-2">
                        Permissions
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {permissions.map((permission) => (
                            <label key={permission.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={permission.name}
                                    checked={data.permissions.includes(permission.name)}
                                    onChange={() => handleCheckboxChange(permission.name)}
                                    className="mr-2"
                                />
                                {permission.name}
                            </label>
                        ))}
                    </div>
                    {errors.permissions && (
                        <div className="text-red-500 text-sm mt-1">{errors.permissions}</div>
                    )}
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        Update Role
                    </button>
                </div>
            </form>
        </div>
    );
}
