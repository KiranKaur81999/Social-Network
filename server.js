const express= require('express');
const app= express();
const connectDB = require('./config/db');
const path = require('path');

// Connection to MongoDB

connectDB();

// Init Middleware

app.use(express.json({extended: false}));

// different Routes

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/users',require('./routes/api/users'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profiles',require('./routes/api/profiles'));
app.use('/api/auth',require('./routes/api/auth'));


app.get('/',(req,res)=> res.send('API Running'));

const PORT= process.env.PORT||5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));