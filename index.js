const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.j5z5yuh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const applicantInformationCollection = client
      .db("applicant")
      .collection("applicantInformation");

    app.post("/personalDetail", async (req, res) => {
      const personalDetail = req.body;
      const result = await applicantInformationCollection.insertOne(
        personalDetail
      );
      res.send(result);
    });

    app.post("/businessDetail", async (req, res) => {
      const businessDetail = req.body;
      const result = await applicantInformationCollection.insertOne(
        businessDetail
      );
      res.send(result);
    });

    app.post("/loanDetail", async (req, res) => {
      const loanDetail = req.body;
      const result = await applicantInformationCollection.insertOne(loanDetail);
      res.send(result);
    });

    app.get("/submittedApplication", async (req, res) => {
      const query = {};
      const result = await applicantInformationCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("hello author");
});
app.listen(port, () => {
  console.log(`port running at ${port}`);
});
