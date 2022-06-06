const express = require("express");
const path = require("path");
const http = require("http");

const app = express();

const assetsRouter = require("./server/assets-router");

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", assetsRouter);

const server = http.createServer(app);

require("./server/create-socket")(server);

const { PORT = 5000 } = process.env;

server.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
