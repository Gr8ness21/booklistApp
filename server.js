// DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/BookModel");


// DATABASE
mongoose.connect(process.env.DATABASE_URI);

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

// ROUTES
// INDUCES

// INDEX
// app.get("/books", (req, res)=>{
//     res.send(books)
// });

// N.
// D.
// U.

// CREATE
app.post('/books', (req, res) => {
    // Checking for completed "checke off" book.
    if(req.body.completed === 'on'){
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }

    Book.create(req.body)
        .then(createdBook => {
            console.log('Book has successfuly been created!')
        }).catch(error => {
            console.error('Error Creating Book!')
        })


    res.send(req.body)
});

// E.
// S.

// PORT
const PORT = process.env.PORT;
app.listen(3000, ()=>{
    console.log(`Listening on PORT: ${PORT}`)
});