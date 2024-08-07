import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';
import { userTreinadorRoutes } from './Routes/UserTreinadorRoute';
import { authRouter } from './Routes/AuthRoute';
import { config } from 'dotenv';

config();
const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(flash());

app.use(
    session({
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

// Inicializar o Passport.js
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use(userTreinadorRoutes);

export { app };
