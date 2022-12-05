var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("05/input"),
  //input: require('fs').createReadStream('05/test')
});

let startingStacks = [];
let instructions = [];

// see exercise B details for what this is
let moverMode = 9001;

lineReader.on("line", function (line) {
  if (line.substring(0, 4) == "move") instructions.push(line);
  else startingStacks.push(line);
});

let amountOfStacks;

lineReader.on("close", function () {
  // initialize starting stacks1
  let crates = [];
  amountOfStacks = (startingStacks[0].length + 1) / 4;

  for (let n = 1; n <= amountOfStacks; n++) {
    crates[n] = [];
    for (let i = startingStacks.length - 2; i--; i >= 0) {
      let nextCrate = startingStacks[i].charAt(1 + (n - 1) * 4);
      if (nextCrate != " ") crates[n].push(nextCrate);
    }
  }

  // handle instructions
  instructions.forEach(function (instruction) {
    let cratesToMove = instruction.split(" ")[1];
    let fromStack = instruction.split(" ")[3];
    let toStack = instruction.split(" ")[5];

    // we handle both modes of the machine differently
    if (moverMode == 9000) {
      for (let n = 0; n < cratesToMove; n++)
        crates[toStack].push(crates[fromStack].pop());
    } else if (moverMode == 9001) {
      let intermediate = [];
      for (let n = 0; n < cratesToMove; n++)
        intermediate.push(crates[fromStack].pop());
      for (let n = 0; n < cratesToMove; n++)
        crates[toStack].push(intermediate.pop());
    }
  });

  // get top crates to find answer
  let answer = "";
  for (let n = 1; n <= amountOfStacks; n++) {
    answer = answer + crates[n][crates[n].length - 1];
  }
  console.log(answer);
});
