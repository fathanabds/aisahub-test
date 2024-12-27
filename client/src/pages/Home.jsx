import OrderRow from '../components/OrderRow';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../features/ordersSlice';
import { useDebouncedCallback } from 'use-debounce';
import { Pagination } from '@mui/material';
import AddOrder from '../components/AddOrder';

export default function Home() {
  const orders = useSelector((state) => state.orders.value);
  const { totalPages, currentPage } = useSelector((state) => state.orders.pagination);
  const [page, setPage] = useState(currentPage);

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setSearch(value);
      setPage(1);
    },
    // delay in ms
    250
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddClick() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    dispatch(fetchOrders(search, status, page));
  }, [search, status, page]);

  const handlePageChange = (_, page) => setPage(page);

  return (
    <>
      {/* <!-- Main Content --> */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order List</h2>
          {localStorage.getItem('role') == 'admin' && (
            <div className="flex items-center">
              <button onClick={handleAddClick} className="btn hover:bg-green-400 bg-green-500 text-white px-4 py-2 rounded">
                + Add Order List
              </button>
              <AddOrder setIsModalOpen={setIsModalOpen} isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-grow">
            <label htmlFor="search" className="sr-only">
              Search transaction
            </label>
            <input onChange={(e) => debounced(e.target.value)} id="search" type="text" placeholder="Search transaction..." className="border border-gray-300 rounded-lg p-2 w-full" />
          </div>
          <label htmlFor="status" className="text-sm font-medium">
            Order Status
          </label>
          <select
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            value={status}
            id="status"
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value={''}>All</option>
            <option value={'ordered'}>Ordered</option>
            <option value={'inProgress'}>In Progress</option>
            <option value={'delivered'}>Delivered</option>
          </select>
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
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex">
            <Pagination color="primary" onChange={handlePageChange} page={page} count={totalPages} variant="outlined" shape="rounded" />
          </div>
        </div>
      </div>
    </>
  );
}
