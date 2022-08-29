
const express = require("express");

const app = express();
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/about/", function(req, res){
  res.sendFile(__dirname + "/about.html");
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
