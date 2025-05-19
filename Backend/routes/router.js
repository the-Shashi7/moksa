const express = require('express');
const router = express.Router();

const liveData = [];
const historyData = {};

router.get('/history', (req, res) => {
  const last24h = Object.entries(historyData).slice(-24);
  res.json(last24h.map(([hour, data]) => ({ hour, ...data })));
});

function addData(entry) {
  liveData.push(entry);
  if (liveData.length > 100) liveData.shift();

  const now = new Date();
  const hour = now.getHours().toString();

  if (!historyData[hour]) {
    historyData[hour] = { total_in: 0, total_out: 0 };
  }

  historyData[hour].total_in += entry.customers_in;
  historyData[hour].total_out += entry.customers_out;
}

module.exports = { router, addData };