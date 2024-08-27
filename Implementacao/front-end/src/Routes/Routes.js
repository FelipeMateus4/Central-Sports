import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../Pages/Login/Login';
import RegisterTreinador from '../Pages/Register/Register';
import { AdminPage } from '../Pages/AdminPage/AdminPage';
import TournamentsPage from '../Pages/Torneio/Torneio';
import RegisterTorneio from '../Pages/RegistroTorneio/RegisterTorneio';
import EditTorneio from '../Pages/EditTorneio/EditTorneio';
import ProtectedRoute from './ProtectedRoute';
import DeletarTorneio from '../Pages/DeletarTorneio/DeletarTorneio';
import Authenticate from '../Pages/Authenticate/Authenticate';
import SelecaoUsuario from '../Pages/SelecaoUsuario/SelecaoUsuario';
import RegisterAtleta from '../Pages/RegistroAtleta/RegisterAtleta';
import InscricoesPage from '../Pages/Inscricao/Inscrito';
import RegisterInscricao from '../Pages/RegistroInscricao/RegisterInscricao';
import EditInscricao from '../Pages/EditInscricao/EditInscricao';
import DeletarInscricao from '../Pages/DeletarInscricao/DeletarInscricao';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Login /> },
            { path: 'treinador/register', element: <RegisterTreinador /> },
            {
                path: 'atleta/register',
                element: <RegisterAtleta />,
            },
            {
                path: 'admin',
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'torneio',
                element: (
                    <ProtectedRoute>
                        <TournamentsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'create-tournament',
                element: (
                    <ProtectedRoute>
                        <RegisterTorneio />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'edit-tournament/:id',
                element: (
                    <ProtectedRoute>
                        <EditTorneio />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'delete-tournament/:id',
                element: (
                    <ProtectedRoute>
                        <DeletarTorneio />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'authenticate',
                element: (
                    <ProtectedRoute>
                        <Authenticate />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'SelecaoUsuario',
                element: <SelecaoUsuario />,
            },
            {
                path: 'subs',
                element: (
                    <ProtectedRoute>
                        <InscricoesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'create-inscricao',
                element: (
                    <ProtectedRoute>
                        <RegisterInscricao />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'edit-inscricao/:id',
                element: (
                    <ProtectedRoute>
                        <EditInscricao />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'delete-inscricao/:id',
                element: (
                    <ProtectedRoute>
                        <DeletarInscricao />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '*',
        element: <p>404 Error - Nothing here...</p>,
    },
]);
