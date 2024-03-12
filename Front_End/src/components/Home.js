// Home.js
import React, { useEffect } from 'react';
import './Home.css';
import Layout from './Layout';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    !window.localStorage.getItem("userId") && navigate('/login')   
  }, [navigate])

  return (
    <Layout>
        <div className="home-container">
      <h1 className="home-heading">Bienvenue sur la page d'accueil !</h1>
      <p className="home-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu ac
        tortor aliquet posuere. Aliquam erat volutpat. In hac habitasse platea
        dictumst.
      </p>
    </div>
    </Layout>
  );
};

export default Home;
