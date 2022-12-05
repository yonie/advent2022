var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("01/input"),
  //input: require('fs').createReadStream('01/test')
});

var calories = [];

let counter = 0;
calories[0] = 0;
let mostCalories;

lineReader.on("line", function (line) {
  if (line === "") {
    if (!mostCalories || calories[counter] > mostCalories) {
      mostCalories = calories[counter];
    }
    counter++;
    console.log("new elf:", counter);
    calories[counter] = 0;
  } else {
    calories[counter] += parseInt(line);
    console.log(
      "adding calories to elf:",
      counter,
      parseInt(line),
      calories[counter]
    );
  }
});

lineReader.on("close", function () {
  console.log("answer1 is", mostCalories);

  // now find the highest 3 values and sum them
  let sortedCalories = calories
    .sort(function (a, b) {
      return a - b;
    })
    .slice(calories.length - 3);

  let sum = 0;
  sortedCalories.forEach(function (value) {
    sum += value;
  });

  console.log("answer2 is", sum);
});
