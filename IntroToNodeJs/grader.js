var scores = [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
var test = [1, 2, 3];

function average(arr) {
    var answer = 0;
    for (var i = 0; i < arr.length; i++) {
        answer += arr[i];
    }
    answer /= arr.length;
    return Math.round(answer);
}


console.log(average(scores)); //should return 94
console.log(average(scores2)); //should return 68
console.log(average(test));
 