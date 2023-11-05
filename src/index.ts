// ** MongoDB Imports
import { MongoClient } from "mongodb";

// ===========================================================================
const express = require("express");
const body = require("body-parser");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
// ===========================================================================
async function start() {
  try {
    const app = express();

    const mongo = await MongoClient.connect(MONGO_URI);

    await mongo.connect();

    app.db = mongo.db("admin");

    // ** Body Parser **

    app.use(
      body.json({
        limit: "500kb",
      })
    );

    // ** Routes **
    app.use("/customers", require("./routes/customers"));

    // ** Start Server **
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
