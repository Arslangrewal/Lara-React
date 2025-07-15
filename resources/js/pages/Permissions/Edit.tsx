import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { router, usePage } from '@inertiajs/react'; // Import usePage
import axios from 'axios';

// Define the type for the permission prop
interface Permission {
    id: number;
    name: string;
    // Add any other properties your permission object might have
}

interface EditPermissionProps {
    permission: Permission; // Define the prop type
}

const EditPermission = ({ permission: initialPermission }: EditPermissionProps) => {
    // Access props using usePage().props if not passed directly, but here we're passing it.
    // const { permission: initialPermission } = usePage().props as { permission: Permission };

    const [name, setName] = useState(initialPermission.name || ''); // Initialize with the fetched name
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If you need to react to prop changes (e.g., if the component is reused for different permissions
    // without unmounting), you might use useEffect:
    // useEffect(() => {
    //     setName(initialPermission.name || '');
    // }, [initialPermission]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Use PUT or PATCH for updates, and include the permission ID in the URL
            await axios.put(`/permissions/${initialPermission.id}`, { name });
            console.log(initialPermission.id);
            router.visit('/permissions'); // redirect to index after success
        } catch (err: any) {
            if (err.response?.status === 422 && err.response.data.errors?.name) {
                setError(err.response.data.errors.name[0]); // Laravel validation error
            } else {
                setError(err.response?.data?.message || 'Something went wrong!');
            }
            setIsSubmitting(false);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-xl mx-auto p-8 bg-white rounded shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Permission</h2>

                {error && <p className="text-red-600 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Permission Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-slate-600 text-white px-6 py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditPermission;