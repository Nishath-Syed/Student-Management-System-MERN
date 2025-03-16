import express from 'express';
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser'; 
import cors from 'cors'; 
import connectDB from './db/connectDB.js'; 
import studentRoutes from './routes/studentRoutes.js'; 

const app = express();

dotenv.config();  

connectDB();  
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());  
app.use(express.json());  
app.use(cors({
  origin: 'https://67d6930f7a0d6331128eaadc--remarkable-bunny-673cb8.netlify.app',  
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));

app.use('/api/users', studentRoutes);
app.listen(port, () => console.log(`Server is running on port ${port}`));

