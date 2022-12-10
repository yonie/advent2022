const { linkSync, cpSync, cp } = require("fs");

var lineReader = require("readline").createInterface({
  //input: require("fs").createReadStream("10/test"),
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
      // console.log("> addx", v);
      this.cycle();
      this.cycle();
      this.register.x = this.register.x + v;
      // console.log(">> " + this.register.x, this.cycles);
    },
    noop: function () {
      // console.log("> noop");
      this.cycle();
    },
    cycle: function () {
      this.cycles = this.cycles + 1;
      if ((this.cycles - 20) % 40 == 0) {
        console.log("signalstrength", cpu.cycles * cpu.register.x);
        if (this.cycles <= 220) sum = sum + cpu.cycles * cpu.register.x;
      }

    },
  };

  input.forEach((instruction) => {
    // console.log(instruction);
    if (instruction.startsWith("noop")) cpu.noop();
    if (instruction.startsWith("addx"))
      cpu.addx(parseInt(instruction.substring(5)));
  });

  console.log("sum", sum);
});
