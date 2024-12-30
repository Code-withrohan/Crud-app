"use client";
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [forms, setForms] = useState([]);
  const [editingForm, setEditingForm] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      const res = await fetch('/api/form');
      const data = await res.json();
      setForms(data.data);
    };
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/form/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (data.success) {
      setForms(forms.filter((form) => form._id !== id));
      alert('Form deleted successfully');
    } else {
      alert('Failed to delete form');
    }
  };

  const handleEdit = (form) => {
    setEditingForm(form);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/form/${editingForm._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingForm),
    });

    const data = await res.json();

    if (data.success) {
      setForms(
        forms.map((form) =>
          form._id === editingForm._id ? { ...form, ...editingForm } : form
        )
      );
      alert('Form updated successfully');
      setEditingForm(null);
    } else {
      alert('Failed to update form');
    }
  };

  const handleChange = (e) => {
    setEditingForm({ ...editingForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Forms Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Roll Number</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form._id}>
                <td className="py-2 px-4 border-b">{form.name}</td>
                <td className="py-2 px-4 border-b">{form.rollNumber}</td>
                <td className="py-2 px-4 border-b">{form.address}</td>
                <td className="py-2 px-4 border-b">{form.phoneNumber}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    onClick={() => handleEdit(form)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl mb-4">Edit Form</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingForm.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={editingForm.rollNumber}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={editingForm.address}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editingForm.phoneNumber}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditingForm(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
