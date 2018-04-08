var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("welcome in my assignment");
});

app.get("/speak/:animal", function (req, res) {
    // body...
    var voices = {
        pig: "Oink!!!",
        piggy: "Oink!!!",
        piglet: "Oink!!!",
        dog: "Woof Woof !!!",
        doggo: "Woof Woof !!!",
        doggy: "Woof Woof !!!",
        puppy: "Woof Woof !!!",
        cow: "MOOOO MOTHERFUCKER !!!",
        cattle: "MOOOO MOTHERFUCKER !!!",
        cat: "Meow i hate you!",
        kitty: "Meow i hate you!",
        kitten: "Meow i hate you!",
        chick: "KO KO KO KO !!!",
        chicken: "KO KO KO KO !!!",
        nuggets: "KO KO KO KO !!!",
        cock: "KO KO KO KO !!!"
    };
    var animalwritten = req.params.animal;
    var animal = req.params.animal.toLowerCase();
    var voice = voices[animal];
    if (voice === undefined) {
        return res.send("&quot" + animalwritten + "&quot doesn't exist in our database. Sorry !");
    }
    res.send("The " + animalwritten + " says &quot" + voice + "&quot");
})

app.get("/repeat/:what/:times", function(req, res) {
    var what = req.params.what;
    var times = Number(req.params.times);
    var temp = "";
    for (var i = 0; i < times; i += 1) {
        temp += what + " ";
    }
    return res.send(temp);
}) 

app.get("*", function(req, res) {
    res.send("SORRY PAGE NOT FOUND, WHAT ARE YOU DOING WITH YOUR LIFE ?!");
})


app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server has started !");
});