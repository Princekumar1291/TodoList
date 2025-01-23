
// External Module
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

// Local Module
const errorController = require("./controllers/errorController");
const itemsRouter = require('./routers/itemsRouter');

require('dotenv').config();
const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@princecluster.ns8if.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=PrinceCluster`;

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'https://todo-frontend-jet-iota.vercel.app'  // Replace with your frontend URL
// }));
app.use(cors());
app.use(express.json());
app.use(itemsRouter);
app.use(errorController.get404);

const PORT = process.env.PORT || 3000;
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log("err while connecting to db");
})

