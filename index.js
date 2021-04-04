const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const http = require("http");
const config = require("./config");
const databaseConnexion = require("./services/connexion");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const routeApi = express.Router();
app.use("/api", routeApi);

routeApi.use(bodyParser.json({ type: "*/*" }));
// routeApi.use(bodyParser.json());
routeApi.use(cors());
routeApi.use(morgan("common"));

databaseConnexion();

routes(routeApi);
// const server = http.createServer(app);
routeApi.listen(config.port, function () {
  console.log(`Server listen on port ${config.port}`);
});

// module.exports = app;
