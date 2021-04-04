const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  cluster: process.env.CLUSTER_MONGODB,
  port: process.env.PORT,
  dbUser: process.env.BDD_USER,
  dbPassword: process.env.BDD_PASSWORD,
  dbName: process.env.BDD_DBNAME,
  jwtKey: process.env.JWT_KEY,
};
