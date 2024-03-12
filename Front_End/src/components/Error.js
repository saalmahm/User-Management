// Error.js
import React from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';

const Error = () => {
  return (
   <div>
     <Alert color="failure" icon={HiInformationCircle}>
    <span className="font-medium">Error 404!</span> This page est introuvable
  </Alert>
   </div>
  );
};

export default Error;
