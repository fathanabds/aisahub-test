import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../helpers/axiosClient';
import Swal from 'sweetalert2';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const nav = useNavigate();

  function handleChange(e) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.id]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post('/auth/login', form);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('role', data.role);
      nav('/');
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message, '', 'error');
    }
  }

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Login to GSFM</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
              </button>
              <Link to={'/register'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Register?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
