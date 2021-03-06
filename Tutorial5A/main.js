// main.js
const fs = require('fs')
const express = require('express')
 
const app = express()
app.use(express.json())
const port = process.env.PORT || 1337
let books = []

const loadBooks = () => {
  fs.readFile(__dirname + '/' + 'books.json', 'utf8', (err, data) => {
    books = JSON.parse(data)
  });
}
loadBooks()

const saveBooks = () => {
  let data = JSON.stringify(books)
  fs.writeFileSync(__dirname + '/' + 'books.json', data)
}

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/book', (req, res) => {
  res.json(books);
})

app.get('/book/:id', (req, res) => {
  let book = books.find(i => i.id == req.params.id);
  if (book == undefined)
    res.status(404).send('Book not found');
  else
    res.json(book);
})

app.post('/book/:id', (req, res) => {
  let index = books.findIndex(i => i.id == req.params.id);
  if (index != -1)
    res.status(404).send('Book already exits'); 
  else {
    books.push(body);
    saveBooks();
  }
})

app.put('/book', (req, res) => {
  let index = books.findIndex(i => i.id == req.params.id);
  if (index == -1)
    res.status(404).send('Book not found');
  else {
    books[index] = body;
    saveBooks();
  }
})

app.delete('/book/:id', (req, res) => {
  let index = books.findIndex(i => i.id == req.params.id);
  if (index == -1)
    return resolve();
  else {
    books = books.filter(i => i.id != req.params.id);
    saveBooks();
  }
})

app.listen(port, () => 
  console.log(`Books Server listening on port ${port}`)
)