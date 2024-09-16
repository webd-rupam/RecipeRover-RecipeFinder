"use client"

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [form, setForm] = useState({ email: "", name: "", message: "" });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
 
    document.title = "RecipeRover - Contact";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('https://formspree.io/f/mldrvlbg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      toast.success('Message sent successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      setStatus('Message sent successfully!');
      setForm({ email: "", name: "", message: "" }); // Clear the form
    } else {
      toast.error('Oops! Message cannot be sent at this moment.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setStatus('Failed to send message.');
    }

    setLoading(false);
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
 <div className={`min-h-screen bg-gray-100 text-gray-800 ${loading ? 'filter blur-sm' : ''}`}>

{loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-50">
    <span className="relative flex h-7 w-7">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-7 w-7 bg-sky-500"></span>
    </span>
  </div>
)}



       {/* Contact Us Section */}
       <section className="bg-gradient-to-r from-green-300 via-green-400 to-green-600 text-white py-20">
        <div className="container mx-auto text-center px-4 py-9 -mt-7">
          <h1 className="text-5xl font-bold mb-4">Contact us</h1>
          <p className="text-xl mb-8 mt-8">
            Feel free to contact me by submitting the form below, and I will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                required
                value={form.name}
                onChange={handleChange}
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                required
                value={form.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea
                required
                value={form.message}
                onChange={handleChange}
                id="message"
                name="message"
                placeholder="Enter Your Message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600 transition duration-300 ease-in-out"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>

    </>
  );
}

export default Contact;
