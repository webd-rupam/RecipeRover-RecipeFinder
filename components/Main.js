"use client";

import React, { useState, useRef, useEffect } from 'react';

const Main = () => {
  const [showContent, setShowContent] = useState(false);
  const [form, setForm] = useState({ ingredients: "" });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);  // New loading state
  const inputRef = useRef(null);

  useEffect(() => {
 
    document.title = "RecipeRover - Getting Started";
  }, []);

  const handleGetStartedClick = () => {
    if (showContent) {
      inputRef.current.focus();
    } else {
      setShowContent(true);
    }
  };

  useEffect(() => {
    if (showContent && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showContent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFind = async (e) => {
    e.preventDefault();
    const ingredients = form.ingredients.split(',').map(item => item.trim());
    
    setLoading(true);  // Start loading when fetching starts
    setRecipes([]);    // Clear previous recipes

    const appId = "8091b121";  // Your Edamam App ID
    const appKey = "877ce992a829e25ef5fdfb93f88971f6";  // Your Edamam App Key

    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${ingredients.join(",")}&app_id=${appId}&app_key=${appKey}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);  // Stop loading when fetch is complete
    }
  };

  return (
    <div className={`min-h-screen bg-gray-100 text-gray-800 ${loading ? 'filter blur-sm' : ''}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to RecipeRover</h1>
          <p className="text-xl mb-8 mt-8">Discover recipes you can make with what you have at home and let yourself freely enjoy with ease.</p>
          <button
            onClick={handleGetStartedClick}
            className="px-8 py-3 bg-white text-teal-500 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Get Started
          </button>
        </div>
      </section>

      {!showContent && (
        <section className="container mx-auto py-16 px-4">
          <div className="text-center">
            <h2 className="text-4xl font-semibold mb-6">Discover Recipes with Ease</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Simply click "Get Started" to enter your ingredients and find recipes that you can make with what you have on hand. 
              Our curated list of recipes will make meal planning a breeze.
            </p>
            <img 
              src="/intro.gif" 
              alt="Delicious Dishes" 
              className="mx-auto md:w-[40vh] w-[25vh] max-w-md rounded-lg"
            />
          </div>
        </section>
      )}

      {/* Ingredient Input Section */}
      {showContent && (
        <>
          <section className="container mx-auto py-12 px-4">
            <div className="max-w-lg mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-6">Enter Your Ingredients</h2>
              <form onSubmit={handleFind}>
                <input
                  onChange={handleChange}
                  name='ingredients'
                  value={form.ingredients}
                  ref={inputRef}
                  type="text"
                  placeholder="e.g., potato, baking powder, mayonnaise"
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button type="submit" className="px-6 mt-4 py-2 bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600 transition duration-300 ease-in-out">
                  Find Recipes
                </button>
              </form>
            </div>
          </section>

          {/* Recipes Section */}
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-50">
            <span className="relative flex h-7 w-7">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-7 w-7 bg-sky-500"></span>
            </span>
          </div>
          ) : recipes.length > 0 && (
            <section className="container mx-auto py-16 px-4">
              <h2 className="text-4xl font-semibold text-center mb-12">Recipe Suggestions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {recipes.map((recipe, index) => (
                 <a
                 href={recipe.recipe.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
               > <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl duration-300 ease-in-out hover:px-8 transition-all">
                    <img src={recipe.recipe.image} alt={recipe.recipe.label} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">{recipe.recipe.label}</h3>
                    <a
                      href={recipe.recipe.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-teal-500 hover:underline"
                    >
                      {recipe.recipe.source}
                    </a>
                  </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Main;
