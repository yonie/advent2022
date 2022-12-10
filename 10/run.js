var lineReader = require("readline").createInterface({
  // input: require("fs").createReadStream("10/test"),
  input: require("fs").createReadStream("10/input"),
});

let input = [];
let sum = 0;

lineReader.on("line", function (line) {
  input.push(line);
});

lineReader.on("close", function () {
  let cpu = {
    register: {
      x: 1,
    },
    cycles: 0,
    addx: function (v) {
      this.cycle();
      this.cycle();
      this.register.x = this.register.x + v;
    },
    noop: function () {
      this.cycle();
    },
    cycle: function () {
      // draw to screen
      if (
        this.register.x == this.cycles % 40 ||
        this.register.x - 1 == this.cycles % 40 ||
        this.register.x + 1 == this.cycles % 40
      )
        process.stdout.write("#");
      else process.stdout.write(".");
      if (this.cycles % 40 == 39) process.stdout.write("\r\n");

      // signal strength (exercise 10.1)
      if ((this.cycles - 20) % 40 == 0) {
        // console.log("signalstrength", cpu.cycles * cpu.register.x);
        if (this.cycles <= 220) sum = sum + cpu.cycles * cpu.register.x;
      }

      this.cycles = this.cycles + 1;
    },
  };

  input.forEach((instruction) => {
    if (instruction == "noop") cpu.noop();
    if (instruction.startsWith("addx "))
      cpu.addx(parseInt(instruction.substring(5)));
  });

  console.log("answer1 sum", sum);
});
