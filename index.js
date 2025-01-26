import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'; // Import routes
import errorHandler from './middlewares/errorHandler.js'; // Custom error handler
import cors from 'cors'

const app = express();

// Middleware
app.use(express.json());
// app.use(cors("*"))

app.use(cors({
    origin: 'http://localhost:5173', // Vite frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // If you need to send cookies or credentials
}));
// Routes
app.use('/api/auth', authRoutes); // Mount auth routes

// Error Handler
app.use(errorHandler); // Catch and handle errors

// Database Connection
mongoose
    .connect("mongodb+srv://23ai13:qlj2ZWRrcRBylImH@cluster0.i4itz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(`Error connecting to MongoDB: ${error.message}`));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// qlj2ZWRrcRBylImH
