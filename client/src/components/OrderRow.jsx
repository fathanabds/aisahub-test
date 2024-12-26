/* eslint-disable react/prop-types */
import { Button } from '@mui/material';

export default function OrderRow({ order }) {
  return (
    <tr>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.id}</td>
      <td className="py-2 px-4 border border-gray-200 border-b text-green-500">{order.status}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.customer}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.store}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.description}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.amount}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">{order.createdAt}</td>
      <td className="py-2 px-4 border border-gray-200 border-b">
        <Button>Update</Button>
      </td>
    </tr>
  );
}
