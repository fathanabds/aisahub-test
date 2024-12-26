/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { useState } from 'react';
import UpdateStatus from './UpdateStatus';

export default function OrderRow({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleUpdateClick() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <tr>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.id}</td>
      <td className={`py-2 px-4 border border-gray-200 border-b ${order.status == 'ordered' && 'text-yellow-500'} ${order.status == 'inProgress' && 'text-blue-500'} ${order.status == 'delivered' && 'text-green-500'}`}>{order.status}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.User.email}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.Store.name}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.description}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.amount}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.createdAt.split('T')[0].split('-').reverse().join('-')}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">
        <Button onClick={handleUpdateClick}>Update</Button>
      </td>
      <UpdateStatus setIsModalOpen={setIsModalOpen} order={order} isOpen={isModalOpen} onClose={handleCloseModal} />
    </tr>
  );
}
