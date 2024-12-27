import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';
import { useDispatch } from 'react-redux';
import { fetchOrders } from '../features/ordersSlice';

/* eslint-disable react/prop-types */
export default function AddOrder({ isOpen, onClose, setIsModalOpen }) {
  const [customers, setCustomers] = useState([]);
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({ StoreId: '', UserId: '', amount: '', description: '' });
  const dispatch = useDispatch();

  function handleChange(e) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.id]: e.target.value,
      };
    });
  }

  async function fetchCustomers() {
    try {
      const { data } = await axiosClient.get('/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setCustomers(data);
      setForm((prevForm) => {
        return {
          ...prevForm,
          UserId: data[0].id,
        };
      });
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message, '', 'error');
    }
  }

  async function fetchStores() {
    try {
      const { data } = await axiosClient.get('/stores', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setStores(data);
      setForm((prevForm) => {
        return {
          ...prevForm,
          StoreId: data[0].id,
        };
      });
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message, '', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axiosClient.post('/orders', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setIsModalOpen(false);
      dispatch(fetchOrders());
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message, '', 'error');
    }
  }

  useEffect(() => {
    fetchCustomers();
    fetchStores();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Order List</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="StoreId">
              Store
            </label>
            <select onChange={handleChange} value={form.StoreId} className="w-full mt-1 p-2 border rounded" id="StoreId">
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="UserId">
              Customer
            </label>
            <select onChange={handleChange} value={form.UserId} className="w-full mt-1 p-2 border rounded" id="UserId">
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.email}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="amount">
              Amount
            </label>
            <input onChange={handleChange} value={form.amount} className="w-full mt-1 p-2 border rounded" id="amount" type="number" placeholder="Enter order amount" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea onChange={handleChange} value={form.description} className="w-full mt-1 p-2 border rounded" id="description" type="text" placeholder="Enter order description" />
          </div>
          <div className="flex justify-end">
            <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"> Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
