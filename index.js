const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OP336JRhl47HgzCaovbLrffUbWHvFjlwuBZkgdsR1mxUnQjw7D8d3QxYO0eQamW0IjsatyfkiWhCuiDxQJQPM3B00LYXbps5C",
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("payment request received for this amount >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});




exports.api = functions.https.onRequest(app);

//http://127.0.0.1:5001/fir-4cc3a/us-central1/api
