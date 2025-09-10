import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAction} from '../store/auth';
import { useDispatch } from 'react-redux';
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
 const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
         "http://localhost:1000/api/v1/sign-in",
        // `${process.env.REACT_APP_API_URL}/api/v1/sign-in`,
        formData
      );

      console.log("✅ Login Success:", response.data);
        

      dispatch(authAction.login());
      dispatch(authAction.changeRole(response.data.role));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("role", response.data.role);

      navigate("/profile"); // Redirect to home or dashboard after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Log In</h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="username"
            className="w-full p-3 mb-4 rounded bg-zinc-700 placeholder-gray-400 focus:outline-none"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            className="w-full p-3 mb-4 rounded bg-zinc-700 placeholder-gray-400 focus:outline-none"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white font-semibold"
        >
          Log In
        </button>

        <p className="mt-4 mb-3 text-center text-sm text-gray-400">Or</p>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
