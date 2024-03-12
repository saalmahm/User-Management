import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchNom, setSearchNom] = useState("");
  const [searchPrenom, setSearchPrenom] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchVille, setSearchVille] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Récupération de la liste des utilisateurs depuis l'API Laravel
    axios
      .get("http://127.0.0.1:8000/api/utilisateurs")
      .then((response) => {
        setUsers(response.data); // Assurez-vous que response.data est un tableau
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      });
  }, []);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSearchNomChange = (e) => {
    setSearchNom(e.target.value);
  };

  const handleSearchPrenomChange = (e) => {
    setSearchPrenom(e.target.value);
  };

  const handleSearchRoleChange = (e) => {
    setSearchRole(e.target.value);
  };

  const handleSearchVilleChange = (e) => {
    setSearchVille(e.target.value);
  };

  // Filtrer la liste des utilisateurs en fonction des termes de recherche
  const filteredUsers = users.filter((user) => {
    const nomMatch = user.nom.toLowerCase().includes(searchNom.toLowerCase());
    const prenomMatch = user.prenom
      .toLowerCase()
      .includes(searchPrenom.toLowerCase());
    const roleMatch = user.role
      .toLowerCase()
      .includes(searchRole.toLowerCase());
    const villeMatch = user.ville
      .toLowerCase()
      .includes(searchVille.toLowerCase());

    return nomMatch && prenomMatch && roleMatch && villeMatch;
  });
  const handleDeleteUser = (userId) => {
    // Faites une requête DELETE à votre API Laravel
    axios
      .delete(`http://127.0.0.1:8000/api/utilisateurs/${userId}`)
      .then((response) => {
        console.log("Utilisateur supprimé avec succès", response.data);

        // Mettez à jour la liste des utilisateurs après la suppression
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
      });
  };


  // Afficher la liste des utilisateurs filtrés dans des cartes
  const userCards = filteredUsers.map((user) => (
    <div className="user-card" key={user.id}>
      <h3>
        {user.nom} {user.prenom}
      </h3>
      <p>Email: {user.email}</p>
      <p>Téléphone: {user.telephone}</p>
      <p>Sexe: {user.sexe}</p>
      <p>Rôle: {user.role}</p>
      <p>Ville: {user.ville}</p>
      <div className="flex space-x-3">
        <Button color="success">
          <Link to={`/afficher/${user.id}`}>afficher</Link>
        </Button>
        { userRole === "admin" && (
          <>
            <Button color="warning">
              <Link to={`/modifier/${user.id}`}>Modifier</Link>
            </Button>
            <Button color="failure" onClick={() => handleDeleteUser(user.id)}>
              <Link>Supprimer</Link>
            </Button>
          </>
        )}          
      </div>
    </div>
  ));

  return (
    <Layout>
      <div>
        <h2>Liste des utilisateurs</h2>

        {/* Bouton pour afficher/cacher la section de filtrage */}
        <button onClick={toggleFilterVisibility}>
          {isFilterVisible ? "Cacher Filtre" : "Afficher Filtre"}
        </button>

        {/* Section de filtrage */}
        {isFilterVisible && (
          <div className="search-section">
            <p>Nombre total d'utilisateurs : {users.length}</p>
            <label>
              Nom:
              <input
                type="text"
                value={searchNom}
                onChange={handleSearchNomChange}
              />
            </label>
            <label>
              Prénom:
              <input
                type="text"
                value={searchPrenom}
                onChange={handleSearchPrenomChange}
              />
            </label>
            <label>
              Rôle:
              <input
                type="text"
                value={searchRole}
                onChange={handleSearchRoleChange}
              />
            </label>
            <label>
              Ville:
              <input
                type="text"
                value={searchVille}
                onChange={handleSearchVilleChange}
              />
            </label>
          </div>
        )}

        {/* Liste des utilisateurs avec un cadre autour de chaque carte */}
        {userCards.length > 0 ? (
          <div className="flex flex-wrap">
            {userCards.map((userCard) => (
              <div
                key={userCard.key}
                className="user-card p-4 border border-gray-500 m-3"
              >
                {userCard}
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </div>
    </Layout>
  );
};

export default Users;