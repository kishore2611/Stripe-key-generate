const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51LT7hqCWWqYziXQsj9k5aJwsNYJ8VqgRpyD92MisMYaC6wBJzKLTB4PypFoolgIN4WaB64wbiIm8S2EoBvoHnh5L00isiXlrB6');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Turn anything into an NFT with a single API callcurl --request POST \--url https://api.nftport.xyz/v0/mints/easy/urls\--header 'Authorization: Your API Key' \--data'{   "chain": "ethereum",   "name": "Space Shipping”,   "description" "Spaceship on Mars",   "file_url": "https://ipfs.io/ipfs",   "mint_to_address": "0x5FDd0881Ef28"   }'

app.listen(4242, () => console.log("Node server listening on port 4242!"));