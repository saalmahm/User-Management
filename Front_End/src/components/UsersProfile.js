import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (userId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/utilisateurs/${userId}`);
          setUser(response.data);
        } else {
          console.error("No user connected");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveData = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/utilisateurs/${user.id}`, user);
      
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4">My Profil</h2>
        {user ? (
          <ul className="bg-white shadow-md p-6 rounded-md flex space-x-8">
            <img className="w-1/4 h-1/4 rounded-md" src={user.photo} alt={`${user.nom} ${user.prenom}`} />
            <li className="w-3/4">
              <p className="text-lg font-semibold">Nom: {isEditing ? <input type="text" name="nom" value={user.nom} onChange={handleEditInputChange} /> : user.nom}</p>
              <p className="text-lg font-semibold">Prénom: {isEditing ? <input type="text" name="prenom" value={user.prenom} onChange={handleEditInputChange} /> : user.prenom}</p>
              <p className='text-lg'>Telephone: {isEditing ? <input type="text" name="telephone" value={user.telephone} onChange={handleEditInputChange} /> : user.telephone}</p>
        <p className='text-lg'>Sexe: {isEditing ? <input type="text" name="sexe" value={user.sexe} onChange={handleEditInputChange} /> : user.sexe}</p>
        <p className='text-lg'>Nationalité: {isEditing ? <input type="text" name="nationalite" value={user.nationalite} onChange={handleEditInputChange} /> : user.nationalite}</p>
        <p className='text-lg'>Role: {isEditing ? <input type="text" name="role" value={user.role} onChange={handleEditInputChange} /> : user.role}</p>
        <p className='text-lg'>Adresse: {isEditing ? <input type="text" name="adresse" value={user.adresse} onChange={handleEditInputChange} /> : user.adresse}</p>
        <p className='text-lg'>Ville: {isEditing ? <input type="text" name="ville" value={user.ville} onChange={handleEditInputChange} /> : user.ville}</p>            </li>
          </ul>
        ) : (
          <div>Loading...</div>
        )}
        {isEditing ? (
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 inline-block" onClick={handleSaveData}>
            Enregistrer les modifications
          </button>
        ) : (
          <button className="bg-blue-500 hover.bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 inline-block" onClick={handleEditButtonClick}>
            Modifier
          </button>
        )}
        <Link to="/users" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 inline-block ml-4">Retour à la liste des utilisateurs</Link>
      </div>
    </div>
  );
};

export default UserProfilePage;
