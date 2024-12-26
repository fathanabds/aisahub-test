import { Link } from 'react-router-dom';
import OrderRow from '../components/OrderRow';

export default function Home() {
  const orders = [
    {
      id: 1,
      status: 'Success',
      customer: 'fathan@mail.com',
      store: 'Famima',
      amount: '₩500.00',
      description: 'lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione tenetur dolores magnam.',
      createdAt: '2024-12-01',
    },
    {
      id: 2,
      status: 'Ordered',
      customer: 'fathan@mail.com',
      store: 'Alfamart',
      amount: '₩300.00',
      description: 'lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione tenetur dolores magnam.',
      createdAt: '2024-12-26',
    },
  ];

  return (
    <>
      {/* <!-- Main Content --> */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order List</h2>
          {localStorage.getItem('role') == 'admin' && (
            <div className="flex items-center">
              <Link to={'/orders/add'} className="btn hover:bg-green-400 bg-green-500 text-white px-4 py-2 rounded">
                + Add Order List
              </Link>
            </div>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-200 border-b">Id</th>
                <th className="py-2 px-4 border border-gray-200 border-b">Status</th>
                <th className="py-2 px-4 border border-gray-200 border-b">Customer</th>
                <th className="py-2 px-4 border border-gray-200 border-b">Store</th>
                <th className="py-2 px-4 border border-gray-200 border-b">Description</th>
                <th className="py-2 px-4 border border-gray-200 border-b">Amount</th>
                <th className="py-2 px-4 border border-gray-200 border-b">Date</th>
                <th className="py-2 px-4 border border-gray-200 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
              {/* // <OrderRow /> */}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-600">Page 2 of 15</p>
          <div className="flex">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded mr-2">Previous</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
