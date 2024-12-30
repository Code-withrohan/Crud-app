"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    address: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.rollNumber || !formData.address || !formData.phoneNumber) {
      setError('Please fill all fields');
      return;
    }

    setError('');

    try {
      const response = await axios.post('/api/form', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert('Data has been added successfully!');
        setFormData({
          name: '',
          rollNumber: '',
          address: '',
          phoneNumber: '',
        });
      } else {
        alert('Failed to add data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error adding the data. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-12 rounded-xl shadow-xl w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Form Submission</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
          
          {/* Name Input */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Roll Number Input */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="Enter your roll number"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Address Input */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit and Back Buttons */}
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => router.push('/form')}
              className="bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition transform hover:scale-105"
            >
              View Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
