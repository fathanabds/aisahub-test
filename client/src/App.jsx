import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddOrder from './pages/AddOrder';

const router = createBrowserRouter([
  {
    loader: () => {
      if (localStorage.getItem('access_token')) {
        return redirect('/');
      }
      return null;
    },
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    loader: () => {
      if (!localStorage.getItem('access_token')) {
        return redirect('/login');
      }
      return null;
    },
    element: (
      <>
        <div className="flex">
          <Sidebar />
          <Outlet />
        </div>
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/orders/add',
        element: <AddOrder />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
