import http from "http";
import app from "./app";
import configuration from "./configuration";

//
const server = http.createServer(app);

server.listen(configuration.port, () =>
  console.log(`Server Running on http://localhost:${configuration.port}`)
);
