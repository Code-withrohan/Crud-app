"use client";
import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary"; // Import Cloudinary upload widget

const Form = () => {
  const [forms, setForms] = useState([]);
  const [editingForm, setEditingForm] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      const res = await fetch("/api/form");
      const data = await res.json();
      setForms(data.data);
    };
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this form?"
    );

    if (confirmDelete) {
      const res = await fetch(`/api/form/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setForms(forms.filter((form) => form._id !== id));
      }
    }
  };

  const handleEdit = (form) => {
    setEditingForm(form);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/form/${editingForm._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
      setEditingForm(null);
    }
  };

  const handleChange = (e) => {
    setEditingForm({ ...editingForm, [e.target.name]: e.target.value });
  };

  // Cloudinary image upload success handler
  const handleImageUpload = (results) => {
    if (results.info?.secure_url && results.event === "success") {
      setEditingForm({
        ...editingForm,
        image: results.info.secure_url,
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Forms Table
        </h1>
        <a
          href="/form"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
        >
          + Add Data
        </a>
      </div>

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
                <td className="py-3 px-6">
                  <img
                    src={form.image}
                    alt="Form Image"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>
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

              {/* Cloudinary Image Upload */}
              <div className="flex flex-col items-center mt-4">
                <CldUploadWidget
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  onSuccess={handleImageUpload}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}
                      className="bg-blue-500 text-white rounded-full p-5 mt-5 flex items-center justify-center hover:bg-blue-600 transition-shadow shadow-lg hover:shadow-xl"
                    >
                      <span className="text-lg font-bold">Upload Image</span>
                    </button>
                  )}
                </CldUploadWidget>

                {editingForm.image && (
                  <div className="mt-5">
                    <img
                      src={editingForm.image}
                      alt="Uploaded"
                      className="w-32 h-32 rounded-lg shadow-md"
                    />
                  </div>
                )}
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

export default Form;
