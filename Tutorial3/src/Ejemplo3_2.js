// ejemplo3_2.js
const util = require('util');
const express = require('express');
const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');
const pkg_def = loader.loadSync(__dirname + '/' + 'grpc-book.proto');
const book = grpc.loadPackageDefinition(pkg_def).book;
const app = express()
const port = process.env.PORT || 1337 
const target = process.env.TARGET || 'localhost:4000';
const client = new book.BookService(
  target,
  grpc.credentials.createInsecure()
);
const getBook = util.promisify(client.getBook.bind(client));
app.get('/', (req,res) => {
	Promise.resolve(getBook({id: 1})).then(book => {
	  res.json(book)
	}).catch(reason => {
	  console.log(reason)
	});
})
app.listen(port, () => console.log(`Server listening on port ${port}`))