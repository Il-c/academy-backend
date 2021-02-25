var express = require("express");
var app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

console.log("Moikka moi!");
