var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    // body...
    var search = req.query.search;
    if (search === undefined) {
        search = "kitty";
    }
    var url = "http://www.omdbapi.com/?s=" + search + "&apikey=thewdb";
    request(url, function (error, response, body) {
        // body...
        var data = JSON.parse(body);
        if (data.Error === "Too many results.") {
            data = {Search: [{Title: "Too many results."}]};
            res.render("html", {data: data});
        } else if (!error && response.statusCode == 200) {
            res.render("html", {data: data});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started !");
});
