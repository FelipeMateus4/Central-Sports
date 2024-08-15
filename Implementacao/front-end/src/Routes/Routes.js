import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../Pages/Login/Login';
import RegisterTreinador from '../Pages/Register/Register';
import { AdminPage } from '../Pages/AdminPage/AdminPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Login /> },
            { path: '/treinador/register', element: <RegisterTreinador /> },
            { path: '/admin/', element: <AdminPage /> },
        ],
    },
]);
