// main.js
const fs = require('fs')
const express = require('express')
 
const app = express()
app.use(express.json())
const port = process.env.PORT || 1338
let authors = []

const loadAuthors = () => {
  fs.readFile(__dirname + '/' + 'authors.json', 'utf8', (err, data) => {
    authors = JSON.parse(data)
  });
}
loadAuthors()

const saveAuthors = () => {
  let data = JSON.stringify(authors)
  fs.writeFileSync(__dirname + '/' + 'authors.json', data)
}

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/author', (req, res) => {
  res.json(authors);
})

app.get('/author/:id', (req, res) => {
  let author = authors.find(i => i.id == req.params.id);
  if (author == undefined)
    res.status(404).send('Author not found');
  else
    res.json(author);
})

app.post('/author/:id', (req, res) => {
  let index = authors.findIndex(i => i.id == req.params.id);
  if (index != -1)
    res.status(404).send('Author already exits'); 
  else {
    authors.push(body);
    saveAuthors();
  }
})

app.put('/author', (req, res) => {
  let index = authors.findIndex(i => i.id == req.params.id);
  if (index == -1)
    res.status(404).send('Author not found');
  else {
    authors[index] = body;
    saveAuthors();
  }
})

app.delete('/author/:id', (req, res) => {
  let index = authors.findIndex(i => i.id == req.params.id);
  if (index == -1)
    return resolve();
  else {
    authors = authors.filter(i => i.id != req.params.id);
    saveAuthors();
  }
})

app.listen(port, () => 
  console.log(`Authors Server listening on port ${port}`)
)