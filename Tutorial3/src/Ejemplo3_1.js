// ejemplo3_1.js
const fs = require('fs')
const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');
const pkg_def = loader.loadSync(__dirname + '/' + 'grpc-book.proto');
const book = grpc.loadPackageDefinition(pkg_def).book;
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;
const server = new grpc.Server();

let books = []

const loadBooks = () => {
  fs.readFile(__dirname + '/' + 'books.json', 'utf8', (err, data) => {
    books = JSON.parse(data)
  });
}
loadBooks()

server.addService(book.BookService.service, {
  getBook: (call, cb) => {
    let book = find(book => book.id == call.request.id);
    if (book == undefined)
      return cb(new Error(`unknown book ${call.request.id}`));
    else
      cb(null, book);
  }
});
server.bindAsync(`${HOST}:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) throw err;
    server.start();
    console.log(`Producer running at http://${HOST}:${port}/`);
});