import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Afficher() {
    const {id} = useParams();
    const[user, setUser] = useState('');

    useEffect(()=>{
        const fetchUser = async () =>{
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/utilisateurs/${id}`);
                console.log("user profile data", response.data);
                setUser(response.data);
            } catch(error) {
                console.error("error fetching data",error)
            }
        };
        if(id){
            fetchUser();
        }
    },[id]);
    if(!user){
        return <div>Loading...</div>;
    }
  return (
    <div>
        <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-4">Your Profil</h2>
      <ul className="bg-white shadow-md p-6 rounded-md flex space-x-8">
        <img className="w-1/4 h-1/4 rounded-md" src={user.photo} alt={`${user.nom} ${user.prenom}`} />
        <li className="w-3/4">
            <p className="text-lg font-semibold">Nom: {user.nom}</p>
            <p className="text-lg font-semibold">Prénom: {user.prenom}</p>
            <p className='text-lg'>Telephone: {user.telephone}</p>
            <p className='text-lg'>Sexe: {user.sexe}</p>
            <p className='text-lg'>Nationalité: {user.nationalite}</p>
            <p className='text-lg'>Role: {user.role}</p>
            <p className='text-lg'>Adresse: {user.adresse}</p>
            <p className='text-lg'>Ville: {user.ville}</p>
          </li>
      </ul>
      <Link to="/users" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 inline-block">Retour à la liste des utilisateurs</Link>
    </div>
    </div>
  );
}

export default Afficher;
