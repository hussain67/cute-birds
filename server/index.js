const express = require("express");
const { birds } = require("./data");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/birds", async (req, res) => {
	return res.json(birds);
});

app.listen(4000, () => {
	console.log("listening");
});
