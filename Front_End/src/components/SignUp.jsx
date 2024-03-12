import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    sexe: "",
    nationalite: "",
    adresse: "",
    ville: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/utilisateurs",
        formData
      );
        console.log("Utilisateur créé avec succès:", response.data);
        navigate("/login");
      
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'utilisateur:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="nom"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                onChange={handleChange}
                autoComplete="text"
                required
                className="mt-1 p-3 w-full rounded-md border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="prenom"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                onChange={handleChange}
                autoComplete="text"
                required
                className="mt-1 p-3 w-full rounded-md border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* ... Autres champs du formulaire */}

          <div>
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-gray-700"
            >
              Telephone
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              onChange={handleChange}
              autoComplete="text"
              className="mt-1 p-3 w-full rounded-md border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="sexe"
              className="block text-sm font-medium text-gray-700"
            >
              Sexe
            </label>
            <input
              type="text"
              id="sexe"
              name="sexe"
              onChange={handleChange}
              autoComplete="text"
              className="mt-1 p-3 w-full rounded-md border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="nationalite"
              className="block text-sm font-medium text-gray-700"
            >
              Nationalité
            </label>
            <input
              type="text"
              id="nationalite"
              name="nationalite"
              onChange={handleChange}
              autoComplete="text"
              className="mt-1 p-3 w-full rounded-md border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="adresse"
              className="block text-sm font-medium text-gray-700"
            >
              Adresse
            </label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              onChange={handleChange}
              autoComplete="text"
              className="mt-1 p-3 w-full rounded-md border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="ville"
              className="block text-sm font-medium text-gray-700"
            >
              Ville
            </label>
            <input
              type="text"
              id="ville"
              name="ville"
              onChange={handleChange}
              autoComplete="text"
              className="mt-1 p-3 w-full rounded-md border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              required
              className="mt-1 p-3 w-full rounded-md border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="mt-1 p-3 w-full rounded-md border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="mt-1 p-3 w-full rounded-md border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
