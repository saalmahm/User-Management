import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import "./Navbar.css"; // Assurez-vous d'importer ou de mettre à jour les styles si nécessaire

const AppNavbar = () => {
  const navigate = useNavigate();


  const redirectToProfile = () => {
    navigate("/profile");
  };
  const handleSignout = () =>{
    localStorage.removeItem("userId");
    navigate("/login");
  }

  return (
    <Navbar className="bg-gray-500 p-4">
      <Navbar.Brand>
        <img
          src="/logo192.png"
          className="mr-3 h-6 sm:h-9"
          alt=" React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Gestion des stagiaires
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="téléchargement (2).png"
              rounded
            />
          }
        >
          <Dropdown.Item onClick={redirectToProfile}>
            Mes informations personnelles
          </Dropdown.Item>
          <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="text-white" as={Link} to="/home" >
          Home
        </Navbar.Link>
        <Navbar.Link className="text-white" as={Link} to="/users">
          Users
        </Navbar.Link>
        <Navbar.Link className="text-white" as={Link} to="/about">
          About
        </Navbar.Link>
        <Navbar.Link className="text-white" as={Link} to="/contact">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
