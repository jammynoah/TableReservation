import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; //
import { errorMiddleware } from './middlewares/error.js';
import reservationRouter from './routes/reservationRoute.js';
import { dbConnection } from './database/dbConnection.js';

const app = express();
dotenv.config({ path: './config/config.env' });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL], //isse frontened connect karne ke liye use kiya hai eke backened se kitne bhi frontened , aise add kar sakte hai
    methods: ['POST'], //hum log sirf data bhenenge isliye post
    credentials: true,
  })
);
app.use(express.json()); //string ko json mai convert kar dega            //use middleware ke liye hota hai
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/reservation', reservationRouter);
app.get('/', (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: 'HELLO WORLD',
  });
});

dbConnection();

app.use(errorMiddleware);

export default app;
