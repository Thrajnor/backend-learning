var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/posts/:login", function (req, res) {
    // body...
    var login = req.params.login; 
    // if (login === undefined) {
    //     login = "Guest";
    // }
    var posts = [
            {post: "Corgis are adorable", author: "elza"},
            {post: "Do you believe in GOD ?!", author: "Christ"},
            {post: "Programing is easy", author: "Piotr"}
        ];
        
    res.render("posts", {login: login, posts: posts});
});

app.get("/:someone", function (req, res) {
    // body...
    var someone = req.params.someone;
    
    res.render("html", {someone: someone});
});

app.get("/", function (req, res) {
    // body...
    res.redirect("/Guest");
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started !");
});