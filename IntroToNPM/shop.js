var faker = require("faker");


console.log("==================");
console.log("Welcome In My Shop");
console.log("==================");

for (var i = 1; i < 11; i++) {
    console.log(faker.fake(i + ". {{commerce.productName}} - ${{commerce.price}}"));
}

console.log("==================");
console.log("BYE BYE !!!!");
console.log("==================");