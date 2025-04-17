import React from 'react';
import LoginPage from "../../assets/LoginPage.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-full h-screen">
      
      {/* Left Side - Content */}
      <div className="w-full lg:w-2/3 flex flex-col 
      justify-center   p-8">
        <h1 className='text-4xl font-semi-bold absolute top-0 m-8 '>Task Manager</h1>
        <div className=''>
            {children}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block w-1/2 h-full">
        <img
          src={LoginPage}
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>
      
    </div>
  );
};

export default AuthLayout;
