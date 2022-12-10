const { linkSync } = require("fs");

var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("09/input"),
  //input: require("fs").createReadStream("09/test"),
});

let input = [];
let answer = [];
let highest = [];
let lowest = [];

lineReader.on("line", function (line) {
  input.push(line);
});

lineReader.on("close", function () {
  // create rope
  const rope = {
    head: { x: 0, y: 0 },
    tail: { x: 0, y: 0 },
    moveHead: function (x, y) {
      this.head.x = this.head.x + x;
      this.head.y = this.head.y + y;

      this.tail = moveTail(this.head, this.tail);
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

  console.log("unique positions", answer.length);
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
  let tailPos = "x" + [tail.x] + "|y" + [tail.y];
  if (!answer.includes(tailPos)) answer.push(tailPos);
  return tail;
}
