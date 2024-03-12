// AboutUs.js
import React from 'react';
import './AboutUs.css';
import Layout from './Layout';


const AboutUs = () => {
  return (
    <Layout>
        <div className="about-us-container">
      <h1 className="about-us-heading">Bienvenue sur la page About us !</h1>
      <p className="about-us-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu ac
        tortor aliquet posuere. Aliquam erat volutpat. In hac habitasse platea
        dictumst.
      </p>
    </div>
    </Layout>
  );
};

export default AboutUs;
