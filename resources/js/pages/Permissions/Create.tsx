import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';

const CreatePermission = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await axios.post('/api/permissions', { name }); // Adjust endpoint if needed
            navigate('/permissions');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong!');
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
                        disabled={isSubmitting}
                        className="bg-slate-600 text-white px-6 py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default CreatePermission;
