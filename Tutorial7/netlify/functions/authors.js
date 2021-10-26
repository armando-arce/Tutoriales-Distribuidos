// main.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')

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

app.use(bodyParser);

app.get('/', (req, res) => {
  res.json(authors);
})

app.get('/:id', (req, res) => {
  let author = authors.find(i => i.id == req.params.id);
  if (author == undefined)
    res.status(404).send('Author not found');
  else
    res.json(author);
})

app.post('/:id', (req, res) => {
  let index = authors.findIndex(i => i.id == req.params.id);
  if (index != -1)
    res.status(404).send('Author already exits'); 
  else {
    authors.push(body);
    saveAuthors();
  }
})

app.put('/', (req, res) => {
  let index = authors.findIndex(i => i.id == req.params.id);
  if (index == -1)
    res.status(404).send('Author not found');
  else {
    authors[index] = body;
    saveAuthors();
  }
})

app.delete('/:id', (req, res) => {
  let index = authors.findIndex(i => i.id == req.params.id);
  if (index == -1)
    return resolve();
  else {
    authors = authors.filter(i => i.id != req.params.id);
    saveAuthors();
  }
})

module.exports.handler = serverless(app);