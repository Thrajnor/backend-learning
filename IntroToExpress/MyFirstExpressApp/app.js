var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("HI THERE!");
});

app.get("/bye", function (req, res) {
    res.send("Goodbye!");
});

app.get("/dog", function(req, res) {
    res.send("MEOW!");
})

app.get("/z/:stronaName/:id", function(req, res) {
    var stronaName = req.params.stronaName;
    res.send("HELLO ON A " + stronaName.toUpperCase() +" SITE");
})

app.get("*", function(req, res) {
    res.send("YOU ARE IN WRONG NEIGHBOURHOOD, MADAFUCKER !!!")
})



app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server has started !");
});