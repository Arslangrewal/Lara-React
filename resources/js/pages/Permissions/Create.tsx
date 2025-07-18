import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import axios from 'axios';

const CreatePermission = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isUpdating, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await axios.post('/permissions', { name });
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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Permission</h2>

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
                        disabled={isUpdating}
                        className="bg-slate-600 text-white px-6 py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {isUpdating ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default CreatePermission;
