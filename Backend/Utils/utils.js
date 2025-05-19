function getHourlySummary(history) {
  const now = new Date();
  const summary = {};

  for (let i = 0; i < 24; i++) {
    const date = new Date(now);
    date.setHours(now.getHours() - i, 0, 0, 0);
    const key = date.toISOString().slice(0, 13);

    summary[key] = { in: 0, out: 0 };
  }

  for (const event of history) {
    const eventTime = new Date(event.time_stamp || event.receivedAt);
    const hourKey = eventTime.toISOString().slice(0, 13);

    if (summary[hourKey]) {
      if (event.type === "in") summary[hourKey].in += 1;
      else if (event.type === "out") summary[hourKey].out += 1;
    }
  }

 
  return Object.entries(summary)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([hour, data]) => ({
      hour, 
      ...data,
    }));
}

module.exports = { getHourlySummary };