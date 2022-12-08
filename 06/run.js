var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("06/input"),
  //input: require('fs').createReadStream('06/test')
});

lineReader.on("line", function (line) {
  console.log(findMarker("bvwbjplbgvbhsrlpgdmjqwftvncz", 4), 5);
  console.log(findMarker("nppdvjthqldpwncqszvftbrmjlhg", 4), 6);
  console.log(findMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 4), 10);
  console.log(findMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 4), 11);
  console.log("answer 1", findMarker(line, 4));
  console.log("answer 2", findMarker(line, 14));
});

lineReader.on("close", function () {});

function findMarker(input, distintCharacters) {
  for (let n = distintCharacters; n < input.length; n++) {
    let fragment = input.substring(n - distintCharacters, n);
    if (new Set(fragment).size == fragment.length) return n;
  }
}
