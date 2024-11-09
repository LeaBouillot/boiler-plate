const express = require("express");
const app = express();
const port = 4000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = DATABASE_URL;

const { User } = require("./models/User");
const bodyParser = require("body-parser");

// application/x-www-form-urlencoded data format
app.use(bodyParser.urlencoded({ extended: true }));
// application/json format
app.use(bodyParser.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Run the server
app.get("/", (req, res) => {
  res.send("salut lea!");
});

// register
app.post("/register", (req, res) => {
  const user = new User(req.body); // par bodyParser.json
  //save methode de mongo db
  user.save((err, userInfo) => {
    if (err) return res.json({ sucsess: false, err });
    return res.status(200).json({
      sucsess: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
