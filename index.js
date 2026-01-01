import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
var API_KEY = "fce192366e654abba4f6bc273e6deb2d";
const BASE_URL = "http://api.football-data.org/v4/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running on port  ${port} `);
});
const config = {
  headers: {
    "X-Auth-Token": API_KEY,
  },
};

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(BASE_URL + "competitions/PL/teams", config);
    res.render("index.ejs", { response: result.data.teams });
  } catch (error) {
    res.status(404).send("Not found" + error);
  }
});
