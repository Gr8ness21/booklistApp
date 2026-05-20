// DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const methodOverride = require("method-override");
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
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// ROUTES
// INDUCES

// HOME :)
app.get("/", (req, res)=>{
    res.render("home.ejs")
});

// INDEX
app.get("/books", async (req, res) =>{
    // res.render("index.ejs") <- for testing
    try{
        const allBooks = await Book.find({});
        res.render("index.ejs", {
            books: allBooks
        });
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }

});

// NEW
app.get("/books/new", (req, res)=>{
    res.render("new.ejs")
});

// DELETE
app.delete("/books/:id", async (req, res) =>{
    // res.send("Deleting Book...")
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.redirect("/books");
    }catch(error){
        console.error(error)
        res.status(500).send("There was an issue Deleting the book...")
    }
});


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
            console.log(req.body)
            res.redirect("/books")
        }).catch(error => {
            console.error('Error Creating Book!')
            res.status(500).send("ISSUE CREATING BOOK!")
        })
    
});

// E.
// SHOW
app.get("/books/:id",async (req, res) =>{
    // res.render("show.ejs") <-fine for rendering simple page
    try{
        const foundBook = await Book.findById(req.params.id)
        res.render("show.ejs", {
            book: foundBook,
        });
    }catch(error){
        res.status(500).send("ISSUE FINDING INDIVIDUAL BOOK!")
    }
});

// PORT
const PORT = process.env.PORT;
app.listen(3000, ()=>{
    console.log(`Listening on PORT: ${PORT}`)
});