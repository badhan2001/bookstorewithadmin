import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log(`Updated ${name}:`, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting formData:', formData);
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-up",
        formData
      );
      alert(response.data.message);
      setFormData({ username: '', email: '', password: '', address: '' });
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="username"
          className="w-full p-3 mb-4 rounded bg-zinc-700 placeholder-gray-400 focus:outline-none"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="email"
          className="w-full p-3 mb-4 rounded bg-zinc-700 placeholder-gray-400 focus:outline-none"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-full p-3 mb-4 rounded bg-zinc-700 placeholder-gray-400 focus:outline-none"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />

        <textarea
          name="address"
          placeholder="address"
          className="w-full p-3 mb-4 rounded bg-zinc-700 placeholder-gray-400 focus:outline-none"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white font-semibold"
        >
          SignUp
        </button>

        <p className="mt-4 mb-3 text-center text-sm text-gray-400">Or</p>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            LogIn
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
