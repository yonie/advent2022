const { linkSync } = require("fs");

var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("09/input"),
  //input: require("fs").createReadStream("09/test"),
});

let input = [];
let answer = [];
let answer2 = [];

lineReader.on("line", function (line) {
  input.push(line);
});

lineReader.on("close", function () {
  // create rope
  const rope = {
    head: { x: 0, y: 0 },
    tail1: { x: 0, y: 0 },
    tail2: { x: 0, y: 0 },
    tail3: { x: 0, y: 0 },
    tail4: { x: 0, y: 0 },
    tail5: { x: 0, y: 0 },
    tail6: { x: 0, y: 0 },
    tail7: { x: 0, y: 0 },
    tail8: { x: 0, y: 0 },
    tail9: { x: 0, y: 0 },
    moveHead: function (x, y) {
      this.head.x = this.head.x + x;
      this.head.y = this.head.y + y;
      this.tail1 = moveTail(this.head, this.tail1);
      let tail1Pos = "1x" + [this.tail1.x] + "|y" + [this.tail1.y];
      if (!answer.includes(tail1Pos)) answer.push(tail1Pos);
      this.tail2 = moveTail(this.tail1, this.tail2);
      this.tail3 = moveTail(this.tail2, this.tail3);
      this.tail4 = moveTail(this.tail3, this.tail4);
      this.tail5 = moveTail(this.tail4, this.tail5);
      this.tail6 = moveTail(this.tail5, this.tail6);
      this.tail7 = moveTail(this.tail6, this.tail7);
      this.tail8 = moveTail(this.tail7, this.tail8);
      this.tail9 = moveTail(this.tail8, this.tail9);
      let tail9Pos = "9x" + [this.tail9.x] + "|y" + [this.tail9.y];
      if (!answer2.includes(tail9Pos)) answer2.push(tail9Pos);
    },
  };

  input.forEach((movement) => {
    let cmd = movement.charAt(0);
    let val = parseInt(movement.substring(2));
    // console.log(cmd, val);
    let dx = 0;
    let dy = 0;
    if (cmd == "U") dy = -val;
    if (cmd == "D") dy = val;
    if (cmd == "L") dx = -val;
    if (cmd == "R") dx = val;
    while (dx > 0) {
      rope.moveHead(1, 0);
      dx = dx - 1;
    }
    while (dx < 0) {
      rope.moveHead(-1, 0);
      dx = dx + 1;
    }
    while (dy > 0) {
      rope.moveHead(0, 1);
      dy = dy - 1;
    }
    while (dy < 0) {
      rope.moveHead(0, -1);
      dy = dy + 1;
    }
  });

  console.log("unique positions 1", answer.length);
  console.log("unique positions 9", answer2.length);
});

function moveTail(head, tail) {
  if (head.x > tail.x + 1 && head.y == tail.y) {
    tail.x = tail.x + 1;
  } else if (head.x < tail.x - 1 && head.y == tail.y) {
    tail.x = tail.x - 1;
  } else if (head.y > tail.y + 1 && head.x == tail.x) {
    tail.y = tail.y + 1;
  } else if (head.y < tail.y - 1 && head.x == tail.x) {
    tail.y = tail.y - 1;
  } else if (Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2) {
    // do nothing, still touching
  } else if (head.x > tail.x && head.y > tail.y) {
    tail.x = tail.x + 1;
    tail.y = tail.y + 1;
  } else if (head.x > tail.x && head.y < tail.y) {
    tail.x = tail.x + 1;
    tail.y = tail.y - 1;
  } else if (head.x < tail.x && head.y > tail.y) {
    tail.x = tail.x - 1;
    tail.y = tail.y + 1;
  } else if (head.x < tail.x && head.y < tail.y) {
    tail.x = tail.x - 1;
    tail.y = tail.y - 1;
  }
  return tail;
}
