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
import commentRoutes from './routes/commentRoutes.js';
import statusRoutes from './routes/statusRoutes.js';

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/api/main', mainRoutes);
app.use('/api/users', userRoutes);
app.use('/api/goal', goalRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/status', statusRoutes);



if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}


//Error Handler Middleware - otherwise express will return HTML error page
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));