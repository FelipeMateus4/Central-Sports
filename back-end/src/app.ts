import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';
import { PatrocinadorRoutes } from './Routes/PatrocinadorRoute';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(flash());
app.use(PatrocinadorRoutes);

export { app };
