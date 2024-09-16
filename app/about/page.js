"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const About = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
 
    document.title = "RecipeRover - About";
  }, []);

  return (

    <>
    <div className={`min-h-screen bg-gray-100 text-gray-800 ${loading ? 'filter blur-sm' : ''}`}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-50">
          <span className="relative flex h-7 w-7">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-7 w-7 bg-sky-500"></span>
          </span>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-300 via-rose-400 to-rose-600 text-white py-20">
        <div className="container mx-auto text-center px-4 py-9 -mt-7">
          <h1 className="text-5xl font-bold mb-4">About RecipeRover</h1>
          <p className="text-xl mb-8 mt-8">
            RecipeRover is a platform designed to help you find recipes based on ingredients you already have at home.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At RecipeRover, my mission is to simplify meal planning by providing a platform where you can discover exciting recipes using the ingredients you already have. 
          </p>
          <p className="text-gray-700">
            Cooking should be fun and stress-free, whether you are an experienced chef or just getting started in the kitchen. My goal is to help you make the most of what is in your pantry while discovering delicious new dishes.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2"><span className='font-bold'>Innovation:</span> Continuously improving the platform to provide a better user experience.</li>
            <li className="mb-2"><span className='font-bold'>Integrity: </span>Ensuring transparency and reliability in all aspects of the platform.</li>
            <li className="mb-2"><span className='font-bold'>User Focus:</span> Your satisfaction is my priority, and I strive to make RecipeRover as helpful as possible.</li>
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-gray-700 mb-6">
            We would love to hear from you! Whether you have feedback, questions, or just want to say hello, feel free to reach out.
          </p>
          <Link href="/contact" target='_blank'
          className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600 transition duration-300 ease-in-out">
              Contact Me
           
          </Link>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
