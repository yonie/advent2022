var lineReader = require("readline").createInterface({
  //input: require("fs").createReadStream("11/test"),
  input: require("fs").createReadStream("11/input"),
});

let input = [];
// part 2
let worryReduction = true;
let rounds = 20;

let monkeys = [];
function Monkey(id, items, operation, test, targetA, targetB) {
  ((this.timesInspected = 0), (this.id = id)),
    (this.items = items), // 54, 55,33
    (this.operation = operation), // "new = old + 6"
    (this.test = test);
  this.targetA = targetA;
  this.targetB = targetB;
  this.inspect = function () {
    if (this.items.length < 1) return undefined;
    this.timesInspected++;
    let item = this.items.shift();
    // execute operation
    let exec = operation.substring(9).replace("old", item);
    item = eval(item + exec);
    if (worryReduction) item = Math.floor(item / 3);
    let target;
    if (item / test == Math.round(item / test)) target = this.targetA;
    else target = targetB;
    return { target: target, value: item };
  };
  this.catchItem = function (value) {
    this.items.push(value);
  };
}

lineReader.on("line", function (line) {
  input.push(line);
});

lineReader.on("close", function () {
  let n = 0;

  // construct monkeys from input
  while (input[7 * n] != undefined) {
    monkeys[n] = new Monkey(
      n,
      input[7 * n + 1].substring(18).split(", "),
      input[7 * n + 2].substring(13),
      input[7 * n + 3].substring(21),
      input[7 * n + 4].substring(29),
      input[7 * n + 5].substring(30)
    );
    n = n + 1;
  }
  let nextItemToThrow;

  // game loop
  for (let round = 1; round <= rounds; round++) {
    monkeys.forEach((monkey) => {
      // console.log("round", round, "monkey", monkey);
      while ((nextItemToThrow = monkey.inspect()) != undefined) {
        monkeys[nextItemToThrow.target].catchItem(nextItemToThrow.value);
      }
    });
    console.log("end of round" + round);
  }

  let answer1 = []

  monkeys.forEach((monkey) => {
    console.log(
      "monkey:",
      monkey.id,
      ", times inspected:",
      monkey.timesInspected
    );
    answer1.push(monkey.timesInspected)
  });

  answer1.sort(function(a,b){return b-a})
  console.log("monkey business:",answer1[0]*answer1[1])
});
