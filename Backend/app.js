const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const { startConsumer } = require("./Kafka/consumer.js");
const { getHourlySummary } = require("./Utils/utils.js");
const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const eventHistory = [];


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true,
  },
});


app.use(cors('http://localhost:5173'));
app.use(express.json());

app.get("/api/history", (req, res) => {
  const hourlySummary = getHourlySummary(eventHistory);
  res.json(hourlySummary);
});

startConsumer((data) => {
  console.log("Received from Kafka:", data);
  eventHistory.push(data);
  io.emit("customer_event", data);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
