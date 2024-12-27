import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import store from './app/store';
import { Provider } from 'react-redux';

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
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
