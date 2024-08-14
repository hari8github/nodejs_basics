const express = require('express');
const {connectToDb, getDb} = require('./db');
const { ObjectId } = require('mongodb');
const { result } = require('lodash');

const app = express();
app.use(express.json());

// db connection

let db


connectToDb((err) => {
    if (!err) {
        app.listen(3002, () => {
            console.log('listening in port 3002!');
        });
        db = getDb()
    }
})

//all books

app.get('/books', (req, res) => {

    //added the pagination also!!

    const pages = req.query.p || 0
    const booksPerPage = 2

    let books = []

    db.collection('books') //db.books
    .find() //cursor methods = toArray, forEach
    .sort({author : 1})
    .skip (pages * booksPerPage) 
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json({books})
    })
    .catch(() =>{
        res.status(500).json({error: "Coluld not fetch the documents"})
    })
});

//individual books

app.get('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})   //add new before the ObjectId
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not fetch the argument'})
        })
    }
    else {
        res.status(500).json({error: 'Invalid ID'})
    }
})

//add new book

app.post('/books', (req, res) => {
    const book = req.body

    db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({error : 'Could not create a new doc'})
    })
})

//delete book

app.delete('/books/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.stauts(500).json({error: 'Could not delete the doc'})
        })
    }
    else {
        res.status(500).json({error: 'Invalid Id'})
    }
})

//update (patch) book

app.patch('/books/:id', (req, res) => {
    const updates = req.body

    if(ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .updateOne({_id: new ObjectId(req.params.id)}, {$set : updates}) 
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({error: 'Could not update the doc'})
        })
    }
    else {
        res.status(500).json({error : 'Invalid Id'})
    }
})