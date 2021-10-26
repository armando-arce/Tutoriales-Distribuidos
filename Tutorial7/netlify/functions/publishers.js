// main.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')

let publishers = []

const loadPublishers = () => {
  fs.readFile(__dirname + '/' + 'publishers.json', 'utf8', (err, data) => {
    publishers = JSON.parse(data)
  });
}
loadPublishers()

const savePublishers = () => {
  let data = JSON.stringify(publishers)
  fs.writeFileSync(__dirname + '/' + 'publishers.json', data)
}

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/', (req, res) => {
  res.json(publishers);
})

app.get('/:id', (req, res) => {
  let publisher = publishers.find(i => i.id == req.params.id);
  if (publisher == undefined)
    res.status(404).send('Publisher not found');
  else
    res.json(publisher);
})

app.post('/:id', (req, res) => {
  let index = publishers.findIndex(i => i.id == req.params.id);
  if (index != -1)
    res.status(404).send('Publisher already exits');
  else {
    publishers.push(body);
    savePublishers();
  }
})

app.put('/', (req, res) => {
  let index = publishers.findIndex(i => i.id == req.params.id);
  if (index == -1)
    res.status(404).send('Publisher not found');
  else {
    publishers[index] = body;
    savePublishers();
  }
})

app.delete('/:id', (req, res) => {
  let index = publishers.findIndex(i => i.id == req.params.id);
  if (index == -1)
    return resolve();
  else {
    publishers = publishers.filter(i => i.id != req.params.id);
    savePublishers();
  }
})

module.exports.handler = serverless(app);