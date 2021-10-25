"use strict"

const clientPromise = require('./mongoDB');

exports.handler = async (event, context) => {

  try {
    const client = await clientPromise;
    const id = parseInt(event.path.split("/").reverse()[0]);
	
    await client.db("bookstore").collection("books").deleteOne({_id:id});
	
    return { statusCode: 200, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, body: String(error) };
  }
};