import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';
import { TreinadorRoutes } from './Routes/UserTreinadorRoute';
import { authRouter } from './Routes/AuthRoute';
import { config } from 'dotenv';
import { userAtletaRoutes } from './Routes/UserAtletaRoute';
import { torneioRoutes } from './Routes/TorneioRoute';
import { inscricaoRoute } from './Routes/InscricaoRoute';

config();
const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());

app.use(
    session({
        name: 'auth_token', // Nome personalizado do cookie
        secret: process.env.SECRETKEY as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 dia de duracao
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET, POST, PUT, DELETE, PATCH',
        credentials: true,
    })
);

app.use('/auth', authRouter);
app.use('/treinador', TreinadorRoutes);
app.use('/atleta', userAtletaRoutes);
app.use('/torneio', torneioRoutes);
app.use('/inscricao', inscricaoRoute);

export { app };
