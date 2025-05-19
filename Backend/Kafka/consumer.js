// kafka/consumer.js
function startConsumer(onMessage) {
  const storeIds = [10, 20, 30];

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

  function getRandomDelay() {
    return 1000 + Math.floor(Math.random() * 4000);
  }

  function emitRandomMessage() {
    const message = generateMessage();
    // console.log("Simulated Kafka Message:", message);
    onMessage(message);

    setTimeout(emitRandomMessage, getRandomDelay());
  }

  emitRandomMessage();
}

module.exports = { startConsumer };
