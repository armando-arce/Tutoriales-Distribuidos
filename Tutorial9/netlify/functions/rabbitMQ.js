"use strict";

const amqp = require('amqplib');

//process.env.CLOUDAMQP_URL = 'amqps://gjyqfkri:Hc-VREN5WwrYLqauzGoCHJdjF28ahEdr@snake.rmq2.cloudamqp.com/gjyqfkri';

module.exports = async() => { 
  const conn = await amqp.connect(process.env.CLOUDAMQP_URL);
  const channel = await conn.createChannel();
  return channel;
}
