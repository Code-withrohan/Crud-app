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
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Forms Table</h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Roll Number</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{form.name}</td>
                <td className="py-3 px-6">{form.rollNumber}</td>
                <td className="py-3 px-6">{form.address}</td>
                <td className="py-3 px-6">{form.phoneNumber}</td>
                <td className="py-3 px-6">{form.imageTitle}</td>
                <td className="py-3 px-6 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(form)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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
          <div className="bg-white p-8 rounded-lg w-1/3 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Form</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingForm.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={editingForm.rollNumber}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={editingForm.address}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editingForm.phoneNumber}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditingForm(null)}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
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
