// ejemplo3_2.js
const util = require('util');
const server = require('express')();
const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');
const pkg_def = loader.loadSync(__dirname + 'grpc-book.proto');
const book = grpc.loadPackageDefinition(pkg_def).book;
const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';
const client = new book.BookService(
  TARGET,
  grpc.credentials.createInsecure()
);
const getBook = util.promisify(client.getBook.bind(client));
server.get('/', async () => {
  const book = getBook({id: 42});
  return {
    consumer_pid: process.pid,
    producer_data: book
}; });
server.listen(PORT, HOST, () => {
  console.log(`Consumer running at http://${HOST}:${PORT}/`);
}