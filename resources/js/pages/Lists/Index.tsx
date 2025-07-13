import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import axios from 'axios';


// All Shadcn UI imports are removed as their paths cannot be resolved in this environment.
// Components are replaced with basic HTML elements and Tailwind CSS for styling.

interface List {
    id: number;
    title: string;
    description: string | null;
    task_count?: number;
}

interface Props {
    lists: List[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: any[] = [
    {
        title: 'Lists',
        href: '#',
    },
];

export default function ListsIndex({ lists: initialLists, flash }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingList, setEditingList] = useState<List | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [lists, setLists] = useState<List[]>(initialLists);
    const [processing, setProcessing] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
                setToastMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);

        try {
            if (editingList) {
                // UPDATE existing list
                const response = await axios.put(`/lists/${editingList.id}`, {
                    title: formData.title,
                    description: formData.description,
                });

                const updatedList = response.data?.list ?? { ...editingList, ...formData };

                setLists(prev =>
                    prev.map(list =>
                        list.id === editingList.id ? updatedList : list
                    )
                );

                setToastMessage('List updated successfully!');
            } else {
                // CREATE new list
                const response = await axios.post('/lists', {
                    title: formData.title,
                    description: formData.description,
                });

                const newList = response.data?.list ?? response.data;
                setLists(prev => [...prev, newList]);

                setToastMessage('List created successfully!');
            }

            setToastType('success');
            setShowToast(true);
            setIsOpen(false);
            setFormData({ title: '', description: '' });
        } catch (error) {
            console.error('Save failed:', error);
            setToastMessage('Save failed!');
            setToastType('error');
            setShowToast(true);
        } finally {
            setProcessing(false);
            setEditingList(null);
        }
    };





    const handleEdit = (list: List) => {
        setEditingList(list);
        setFormData({
            title: list.title,
            description: list.description || '',
        });
        setIsOpen(true);
    };

    const handleDelete = async (listId: number) => {
        if (window.confirm('Are you sure you want to delete this list?')) {
            try {
                await axios.delete(`/lists/${listId}`);

                const updatedLists = lists.filter(list => list.id !== listId);
                setLists(updatedLists);

                setToastMessage('List deleted successfully!');
                setToastType('success');
                setShowToast(true);
            } catch (error) {
                console.error('Delete failed:', error);
                setToastMessage('Delete failed.');
                setToastType('error');
                setShowToast(true);
            }
        }
    };


    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setEditingList(null);
            setFormData({ title: '', description: '' });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 font-inter rounded-xl">
                <div className="sr-only">Lists</div>

                {showToast && (
                    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animate-in fade-in slide-in-from-top-5`}>
                        {toastType === 'success' ? (
                            <CheckCircle2 className='h-5 w-5' />
                        ) : (
                            <XCircle className='h-5 w-5' />
                        )}
                        <span>{toastMessage}</span>
                    </div>
                )}

                <div className="flex justify-between items-center w-full max-w-4xl mb-6 pb-4 border-b border-gray-200">
                    <h1 className='text-3xl font-extrabold text-gray-800'>My Lists</h1>
                    {/* Replaced DialogTrigger Button with a standard button */}
                    <button
                        onClick={() => { setEditingList(null); setFormData({ title: '', description: '' }); setIsOpen(true); }}
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 shadow-md transition-colors"
                    >
                        <Plus className='h-4 w-4 mr-2' />
                        New List
                    </button>
                </div>

                {/* Replaced Dialog with simple conditional rendering for a modal-like div */}
                {isOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm relative">
                            <h2 className="text-xl font-semibold mb-4">
                                {editingList ? 'Edit List' : 'Create New List'}
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">
                                {editingList ? 'Make changes to your list here. Click save when you\'re done.' : 'Create a new list to organize your tasks.'}
                            </p>
                            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor='title' className="text-right text-gray-700">Title</label>
                                    <input
                                        id='title'
                                        type='text'
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="col-span-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="description" className="text-right text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3} // Added rows for better textarea appearance
                                        className="col-span-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenChange(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button type='submit' disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        {editingList ? 'Update List' : 'Create List'}
                                    </button>
                                </div>
                            </form>
                            {/* Close button for the modal */}
                            <button
                                onClick={() => handleOpenChange(false)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
                    {lists.length > 0 ? (
                        lists.map((list) => (
                            <div key={list.id} className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'> {/* Replaced Card with div */}
                                <div className='flex flex-row items-center justify-between space-y-0 pb-2 mb-2 border-b border-gray-100'> {/* Replaced CardHeader with div */}
                                    <h3 className='text-lg font-semibold text-gray-900'> {/* Replaced CardTitle with h3 */}
                                        <a href={`#list-${list.id}`} className="hover:underline text-blue-600">
                                            {list.title}
                                        </a>
                                    </h3>
                                    <div className="flex items-center gap-1">
                                        <button
                                            className="p-2 rounded-full hover:bg-gray-100 transition-colors" // Replaced Button with standard button
                                            onClick={() => handleEdit(list)}
                                        >
                                            <Pencil className="h-4 w-4 text-gray-600" />
                                        </button>
                                        <button
                                            className="p-2 rounded-full hover:bg-red-100 transition-colors" // Replaced Button with standard button
                                            onClick={() => handleDelete(list.id)}
                                        >
                                            <Trash2 className='h-4 w-4 text-red-500' />
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-2"> {/* Replaced CardContent with div */}
                                    <p className="text-sm text-gray-600">
                                        {list.description || 'No description'}
                                    </p>
                                    {list.task_count !== undefined && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            {list.task_count} tasks
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 bg-white rounded-lg shadow-md">
                            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                                <Plus className="h-12 w-12" />
                            </div>
                            <p className="text-muted-foreground mt-4">No lists found. Create a new one!</p>
                        </div>
                    )}
                </div >
            </div>

        </AppLayout>
    );
}
