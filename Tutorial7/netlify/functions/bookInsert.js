"use strict"

const clientPromise = require('./mongoDB')

exports.handler = async (event, context) => {

  try {
	const client = await clientPromise;
	const data = JSON.parse(event.body);
	data._id = parseInt(data._id)
    console.log(event.body)

	await client.db("bookstore").collection("books").insertOne(data);

    return { statusCode: 200, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, body: String(error) };
  }
};