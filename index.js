import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import {connectDB} from './configuration/DBconnect.js';
import authRoutes from './Routes/authRoute.js'
import {errorResponseHandler} from './middleware/errorHandler.js'
import { invalidPathHandler } from './middleware/errorHandler.js'
import userRoutes from './Routes/userRoute.js'
import postRoutes  from './Routes/postRoutes.js';
import commentRoutes  from './Routes/commentRoute.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

const allowedOrigins = [
  'https://blog-post-cift.vercel.app',
  'http://localhost:5000'
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
}));


// Swagger configuration
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Blog API',
        version: '1.0.0',
        description: 'API documentation for the Blog app',
      },
      servers: [
        {url: 'http://localhost:5000/api'},
        { url: 'https://blog-website-i99w.onrender.com' }
      ],
    },
    apis: ['./Routes/*.js'], // Point to where your route files are
  };


const swaggerSpec = swaggerJsdoc(swaggerOptions);
  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes);



app.use(invalidPathHandler);  
app.use (errorResponseHandler);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend is running on port: ${PORT}`);
  });
}).catch((error) => {
  console.error('DB connection failed:', error);
});

