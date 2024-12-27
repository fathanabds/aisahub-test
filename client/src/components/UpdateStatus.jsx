import { useState } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';
import { useDispatch } from 'react-redux';
import { fetchOrders } from '../features/ordersSlice';

/* eslint-disable react/prop-types */
export default function UpdateStatus({ isOpen, onClose, order, setIsModalOpen }) {
  const [status, setStatus] = useState(order.status);
  const dispatch = useDispatch();

  function handleChange(e) {
    setStatus(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axiosClient.patch(
        `/orders/${order.id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setIsModalOpen(false);
      dispatch(fetchOrders());
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message, '', 'error');
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Status</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="updateStatus">
              Order Status
            </label>
            <select id="updateStatus" onChange={handleChange} value={status} className="w-full mt-1 p-2 border rounded">
              <option value={'ordered'}>Ordered</option>
              <option value={'inProgress'}>In Progress</option>
              <option value={'delivered'}>Delivered</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"> Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
