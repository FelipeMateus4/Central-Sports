import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../Pages/Login/Login';
import RegisterTreinador from '../Pages/Register/Register';
import { AdminPage } from '../Pages/AdminPage/AdminPage';
import TournamentsPage from '../Pages/Torneio/Torneio';
import RegisterTorneio from '../Pages/RegistroTorneio/RegisterTorneio';
import EditTorneio from '../Pages/EditTorneio/EditTorneio';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Login /> },
            { path: '/treinador/register', element: <RegisterTreinador /> },
            {
                path: '/admin/',
                element: <ProtectedRoute />,
                children: [{ path: '', element: <AdminPage /> }],
            },
            {
                path: '/torneio/',
                element: <ProtectedRoute />,
                children: [{ path: '', element: <TournamentsPage /> }],
            },
            {
                path: '/create-tournament',
                element: <ProtectedRoute />,
                children: [{ path: '', element: <RegisterTorneio /> }],
            },
            {
                path: '/edit-tournament/:id',
                element: <ProtectedRoute />,
                children: [{ path: '', element: <EditTorneio /> }],
            },
        ],
    },
    {
        path: '*',
        element: <p>404 Error - Nothing here...</p>,
    },
]);
