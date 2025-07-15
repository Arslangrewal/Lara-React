import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
type Permission = {
  id: number;
  name: string;
};

const Permissions: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

const fetchPermissions = async () => {
  try {
    const response = await api.get('/permissions');
    setPermissions(response.data);
  } catch (error: any) {
    console.error('Error fetching permissions:', error);
    alert(error?.response?.data?.message || 'Failed to load permissions.');
  }
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (editingId) {
      await api.put(`/permissions/${editingId}`, { name });
    } else {
      await api.post('/permissions', { name });
    }

    setName('');
    setEditingId(null);
    fetchPermissions();
  } catch (error: any) {
    console.error('Error submitting permission:', error);

    // Optional: show user-friendly error message
    alert(error.response?.data?.message || 'Something went wrong');
  }
};

  const handleEdit = (permission: Permission) => {
    setName(permission.name);
    setEditingId(permission.id);
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/permissions/${id}`);
    fetchPermissions();
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Permissions</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          className="border px-4 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Permission Name"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? 'Update' : 'Create'}
        </button>
      </form>

      <ul className="space-y-2">
        {permissions.map((perm) => (
          <li key={perm.id} className="flex justify-between items-center border p-2 rounded">
            <span>{perm.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(perm)}
                className="bg-yellow-400 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(perm.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Permissions;
