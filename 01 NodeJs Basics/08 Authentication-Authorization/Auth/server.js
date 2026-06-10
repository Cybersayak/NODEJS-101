require ('dotenv').config();
const express = require('express');

const connectToDB = require('./database/db');
connectToDB(); // Connect to the database
const authRoutes = require('./routes/auth-routes'); 

const app= express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/auth", authRoutes); // Use the authentication routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  
});