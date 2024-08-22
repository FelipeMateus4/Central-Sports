import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../Pages/Login/Login';
import RegisterTreinador from '../Pages/Register/Register';
import { AdminPage } from '../Pages/AdminPage/AdminPage';
import TournamentsPage from '../Pages/Torneio/Torneio';
import RegisterTorneio from '../Pages/RegistroTorneio/RegisterTorneio';
import EditTorneio from '../Pages/EditTorneio/EditTorneio';
import DeletarTorneio from '../Pages/DeletarTorneio/DeletarTorneio'; // Importe o componente DeletarTorneio

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Login /> },
            { path: '/treinador/register', element: <RegisterTreinador /> },
            { path: '/admin/', element: <AdminPage /> },
            { path: '/torneio/', element: <TournamentsPage /> },
            { path: '/create-tournament', element: <RegisterTorneio /> },
            { path: '/edit-tournament/:id', element: <EditTorneio /> },
            { path: '/delete-tournament/:id', element: <DeletarTorneio /> }, // Adicione esta linha
        ],
    },
]);
