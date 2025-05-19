const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'dummy-producer',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const storeIds = [10, 20, 30]; // Simulate multiple stores

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateMessage() {
  const store_id = storeIds[getRandomInt(storeIds.length)];
  const customers_in = getRandomInt(5);
  const customers_out = getRandomInt(5);
  const time_stamp = new Date().toISOString();

  return {
    store_id,
    customers_in,
    customers_out,
    time_stamp,
  };
}

async function produceMessages() {
  await producer.connect();

  setInterval(async () => {
    const message = generateMessage();
    console.log('Sending message:', message);

    await producer.send({
      topic: 'store-traffic',
      messages: [{ value: JSON.stringify(message) }],
    });
  }, 2000); // Send every 2 seconds
}

produceMessages().catch(console.error);