import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 3001;
import userRoutes from './routes/userRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import mainRoutes from './routes/mainRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/goal', goalRoutes);
app.use('/profile', profileRoutes);


//Error Handler Middleware - otherwise express will return HTML error page
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));