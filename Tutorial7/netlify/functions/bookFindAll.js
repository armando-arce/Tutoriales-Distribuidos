"use strict"

const clientPromise = require('./mongoDB')

exports.handler = async (event, context) => {

  try {
    const client = await clientPromise;

    const authors = await client.db("bookstore").collection("books").find({}).toArray();

    return { statusCode: 200, body: JSON.stringify(authors)};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, body: String(error) };
  }
};