const app = require("express")();
const routes = require("./routes");
routes(app);
const characterController = require("./controllers/character");
const mongoose = require("mongoose");
const request = require("supertest");
const config = require("./config");

const CONNECT_DATABASE_URL = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.cluster}/${config.dbName}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

describe("Routes test suite", () => {
  beforeEach((done) => {
    console.log("beforeEach");
    mongoose.connect(CONNECT_DATABASE_URL, options, () => done());
  });

  afterEach((done) => {
    console.log("afterEach");
    mongoose.connection.close(() => done());
  });
  it("should return all characters", async () => {
    await request(app)
      .get("/characters", characterController.getCharacters)
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(response.body).toBeTruthy();
        expect(typeof response.body).toEqual("object");
      });
  });
});
