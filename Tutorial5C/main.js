// main.js
const fs = require('fs')
const express = require('express')
 
const app = express()
app.use(express.json())
const port = process.env.PORT || 1339
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

app.get('/publisher', (req, res) => {
  res.json(publishers);
})

app.get('/publisher/:id', (req, res) => {
  let publisher = publishers.find(i => i.id == req.params.id);
  if (publisher == undefined)
    res.status(404).send('Publisher not found');
  else
    res.json(publisher);
})

app.post('/publisher/:id', (req, res) => {
  let index = publishers.findIndex(i => i.id == req.params.id);
  if (index != -1)
    res.status(404).send('Publisher already exits'); 
  else {
    publishers.push(body);
    savePublishers();
  }
})

app.put('/publisher', (req, res) => {
  let index = publishers.findIndex(i => i.id == req.params.id);
  if (index == -1)
    res.status(404).send('Publisher not found');
  else {
    publishers[index] = body;
    savePublishers();
  }
})

app.delete('/publisher/:id', (req, res) => {
  let index = publishers.findIndex(i => i.id == req.params.id);
  if (index == -1)
    return resolve();
  else {
    publishers = publishers.filter(i => i.id != req.params.id);
    savePublishers();
  }
})

app.listen(port, () => 
  console.log(`Publishers Server listening on port ${port}`)
)