import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import {connectDB} from './configuration/DBconnect.js';
import authRoutes from './Routes/authRoute.js'
import {errorResponseHandler} from './middleware/errorHandler.js'
import { invalidPathHandler } from './middleware/errorHandler.js'
import userRoutes from './Routes/userRoute.js'
import postRoutes  from './Routes/postRoutes.js';
import commentRoutes  from './Routes/commentRoute.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes)



app.use(invalidPathHandler);  
app.use (errorResponseHandler);


app.listen(PORT, () => {
    connectDB();
    console.log('backend is running on port:', PORT)
});

