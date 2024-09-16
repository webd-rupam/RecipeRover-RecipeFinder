"use client";

import React, { useEffect, useState } from 'react';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setform] = useState({food:""})

  const fetchRecipes = async () => {
    setLoading(true);
    const appId = "6fa6079e";  // Your Edamam App ID
    const appKey = "f42d763ab617488969059eb3222dee43";  // Your Edamam App Key

    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=cuisine&app_id=${appId}&app_key=${appKey}&from=0&to=24`
      );

      // Check the status and log the response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data);  // Log the entire data response

      if (data.hits) {
        setRecipes(data.hits);
      } else {
        console.error('No results found in response');
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
 
    document.title = "RecipeRover - Search New Recipes";
  }, []);


  const handleChange = (e) => {
  setform({...form, [e.target.name]: e.target.value})
  };

  const handleFind = async (e) => {
    e.preventDefault();
    const food = form.food.split(',').map(item => item.trim());

    setLoading(true);  // Start loading when fetching starts
    setRecipes([]);    // Clear previous recipes

    const appId = "8091b121";  // Your Edamam App ID
    const appKey = "877ce992a829e25ef5fdfb93f88971f6";  // Your Edamam App Key

    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${food.join(",")}&app_id=${appId}&app_key=${appKey}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);  // Stop loading when fetch is complete
    }
  }
  

  return (
<>

    <div className={`min-h-screen bg-gray-100 text-gray-800 ${loading ? 'filter blur-sm' : ''}`}>
      {/* Browse All Recipes Header */}
      <section className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 text-white py-20">
        <div className="container mx-auto text-center px-4 py-3 -mt-5">
          <h1 className="text-5xl font-bold mb-4">Browse All Popular Recipes</h1>
          <p className="text-xl mb-8 mt-8">Explore a variety of popular dishes around the globe!</p>

          {/* Search Box */}
          <form onSubmit={handleFind} className="flex lg:flex-row flex-col gap-4 lg:gap-0 justify-center items-center space-x-4 mt-8">
            <input
            onChange={handleChange}
              type="text"
              name="food"
              value={form.food}
              placeholder="Search for recipes... i,e. dessert, pie, sandwich... "
              className="lg:w-1/3 w-full h-12 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
            />
            <button
              type="submit"
              className="bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 transition-all"
            >
              Search
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
      ) : error ? (
        <section className="container mx-auto py-16 px-4 text-center">
          <p className="text-lg text-gray-600">{error}</p>
        </section>
      ) : (
        recipes.length > 0 ? (
          <section className="container mx-auto py-16 px-4">
            <h2 className="text-4xl font-semibold text-center mb-12">Our Popular Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {recipes.map((recipe, index) => (
                <a
                  key={index}
                  href={recipe.recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl duration-300 ease-in-out hover:px-8 transition-all"
                >
                  <img
                    src={recipe.recipe.image}
                    alt={recipe.recipe.label}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-semibold mb-2">{recipe.recipe.label}</h3>
                  <p className="text-teal-500 hover:underline">{recipe.recipe.source}</p>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <section className="container mx-auto py-16 px-4 text-center">
            <p className="text-lg text-gray-600">No recipes found.</p>
          </section>
        )
      )}
    </div>

    </>
  );
};

export default RecipesPage;
