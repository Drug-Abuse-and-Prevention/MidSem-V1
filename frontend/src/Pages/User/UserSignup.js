import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@nith.ac.in")) {
      alert("Please use your college email ending with @nith.ac.in");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/signup', { email, password, name });
      console.log('Signup successful!', response.data.message);
      alert(response.data.message + " \nPlease Login now");
      navigate('/userlogin');
    } catch (error) {
      console.error('Signup error:', error.response.data);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-start justify-center bg">
      <div className="w-full max-w-md bg-white rounded-lg shadow border mt-10 p-6 md:p-8">
        <h2 className="text-xl font-bold mb-6 md:mb-8">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              id="email"
              placeholder="abcd@nith.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm font-light text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/userlogin" className="font-medium text-primary-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default UserSignup;