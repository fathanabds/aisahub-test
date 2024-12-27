import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const nav = useNavigate();

  function handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    nav('/login');
  }

  return (
    <>
      <div className="w-64 bg-white h-screen shadow-md">
        <div className="p-4">
          <Link to={'/'} className="text-2xl font-bold">
            GSFM
          </Link>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200">
              <Link to={'/'}>Dashboard</Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center mb-4">
            <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/40" alt="Admin" />
            <div className="ml-4">
              <p className="text-gray-700">{localStorage.getItem('email')}</p>
              <p className="text-gray-500">{localStorage.getItem('role')}</p>
            </div>
          </div>
          <Button onClick={handleLogout} className="ml-4" color="error" variant="contained">
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
}
