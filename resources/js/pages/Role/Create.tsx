import { FormEvent } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Permission {
    id: number;
    name: string;
}

export default function CreateRole() {
    const { permissions } = usePage<{ permissions: Permission[] }>().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [] as string[],
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
        post('/roles');
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
                <Head title="Create Role" />

                <h2 className="text-2xl font-semibold mb-4">Create Role</h2>

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
                            Create Role
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
