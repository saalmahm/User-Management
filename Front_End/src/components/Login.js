import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    if (userId && userRole) {
      navigate("/home");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      // Appel à l'API pour récupérer les utilisateurs
      const response = await axios.get(
        "http://127.0.0.1:8000/api/utilisateurs"
      );

      // Récupération de la liste des utilisateurs depuis la réponse de l'API
      const users = response.data;

      // Vérification si l'utilisateur avec l'email et le mot de passe existe
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        console.log("Utilisateur trouvé:", user);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userRole", user.role);
        navigate("/home");
        // Effectuer des actions supplémentaires si nécessaire
        onLogin(user); // Appel de la fonction onLogin avec l'utilisateur en paramètre

        // Vous pouvez maintenant rediriger l'utilisateur vers la page d'accueil ou le tableau de bord
      } else {
        console.error("Email ou mot de passe incorrect");
      }
    } catch (error) {
      // Journaliser l'erreur complète pour le débogage
      console.error("Erreur API:", error);

      // Afficher la réponse de l'API dans la console
      console.log("Réponse de l'API:", error.response);

      // La connexion a échoué, gérer les erreurs ici
      console.error(
        "Échec de la connexion:",
        error.response ? error.response.data.message : "Erreur inconnue"
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="usersProfile.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleLogin}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={handleInputChange}
                value={email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                onChange={handleInputChange}
                value={password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            sign up ?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
