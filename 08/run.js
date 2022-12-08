const { linkSync } = require("fs");

var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("08/input"),
  //input: require("fs").createReadStream("08/test"),
});

let grid = [];
let answer = [];
let answer2 = {};
let input = [];
let height;
let width;

lineReader.on("line", function (line) {
  input.push(line);
});

lineReader.on("close", function () {
  height = input.length;
  width = input[0].length;

  for (let z = height - 1; z >= 0; z--) {
    grid[z] = [];
    for (let x = 0; x < width; x++) {
      grid[z].push(parseInt(input[z][x]));
    }
  }

  let leftEdges = findLeftEdges();
  let rightEdges = findRightEdges();
  let topEdges = findTopEdges();
  let bottomEdges = findBottomEdges();

  grid.forEach((line) => {
    console.log(line);
  });

  console.log("");

  let sumEdges = 0;
  answer.forEach((line) => {
    sumEdges += line.filter((x) => x == 1).length;
  });
  console.log("amount of edges:", sumEdges);

  let highScore = -1
  for (let h = 0;h<height;h++) {
    for (let w = 0;w<width;w++) {
      let score = (calculateScenicScore(h,w))
      if (score>highScore) {
        console.log("found high score:",score)
        highScore=score
      }
    }
  }
});

function findLeftEdges() {
  let result = [];
  for (let z = height - 1; z >= 0; z--) {
    result[z] = [];
    let tallest = -1;
    for (let x = 0; x < width; x++) {
      if (grid[z][x] > tallest) {
        result[z][x] = 1;
        tallest = grid[z][x];
        foundEdge(z, x);
      } else {
        result[z][x] = 0;
      }
    }
  }
  return result;
}

function findRightEdges() {
  let result = [];
  for (let z = height - 1; z >= 0; z--) {
    result[z] = [];
    let tallest = -1;
    for (let x = width - 1; x >= 0; x--) {
      if (grid[z][x] > tallest) {
        result[z][x] = 1;
        tallest = grid[z][x];
        foundEdge(z, x);
      } else {
        result[z][x] = 0;
      }
    }
  }
  return result;
}

function findTopEdges() {
  let result = [];
  for (let x = 0; x < width; x++) {
    let tallest = -1;
    for (let z = 0; z < height; z++) {
      if (!result[z]) result[z] = [];
      if (grid[z][x] > tallest) {
        result[z][x] = 1;
        tallest = grid[z][x];
        foundEdge(z, x);
      } else {
        result[z][x] = 0;
      }
    }
  }
  return result;
}

function findBottomEdges() {
  let result = [];
  for (let x = 0; x < width; x++) {
    let tallest = -1;
    for (let z = height - 1; z >= 0; z--) {
      if (!result[z]) result[z] = [];
      if (grid[z][x] > tallest) {
        result[z][x] = 1;
        tallest = grid[z][x];
        foundEdge(z, x);
      } else {
        result[z][x] = 0;
      }
    }
  }
  return result;
}

function foundEdge(z, x) {
  if (!answer[z]) answer[z] = Array(width).fill(0);
  answer[z][x] = 1;
}

function calculateScenicScore(zh, xh) {
  let houseHeight = grid[zh][xh];

  // look right
  let rightDis = xh == width - 1 ? 0 : 1;
  while (grid[zh][xh + rightDis] < houseHeight && xh + rightDis < width - 1)
    rightDis++;

  // look left
  let leftDis = xh == 0 ? 0 : 1;
  while (grid[zh][xh - leftDis] < houseHeight && xh - leftDis > 0) leftDis++;

  // look up
  let upDis = zh == 0 ? 0 : 1;
  while (grid[zh-upDis][xh] < houseHeight && zh - upDis > 0) upDis++;

  // look down
  let downDis = zh == height -1 ? 0 : 1;
  while (grid[zh+downDis][xh] < houseHeight && zh + downDis < height -1) downDis++;

  // multiply for score
  return (rightDis*leftDis*upDis*downDis)
}
