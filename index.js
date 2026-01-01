import axios from "axios";
import bodyParser from "body-parser";
import express from "express";
// imported express
const app = express();
//port number used in the url of the website
const port = 3000;
//api sent from the creator of this third-party API
var API_KEY = "fce192366e654abba4f6bc273e6deb2d";
const BASE_URL = "http://api.football-data.org/v4/";
//added in order to get the body for next updates if user interacted
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running on port  ${port} `);
});
//better to add a config for the header removing repetitiveness
const config = {
  headers: {
    "X-Auth-Token": API_KEY,
  },
};

//when the user refresh and hit the main , index.ejs will appear and the teams array will be sent to it
app.get("/", async (req, res) => {
  try {
    const result = await axios.get(BASE_URL + "competitions/PL/teams", config);
    res.render("index.ejs", { response: result.data.teams });
  } catch (error) {
    res.status(404).send("Not found" + error);
  }
});
