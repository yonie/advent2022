var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("06/input"),
  //input: require("fs").createReadStream("06/test"),
});

let fs = {};
let input = [];
let answer1 = 0;
let neededSpace;
let answer2;

lineReader.on("line", function (line) {
  input.push(line);
});

lineReader.on("close", function () {
  let path;

  for (let i = 0; i < input.length; i++) {
    if (input[i].startsWith("$ cd ")) {
      // change path
      let target = input[i].substring(5);
      if (target == "/") {
        path = "";
      } else if (target == "..") path = path.slice(0, path.lastIndexOf("/"));
      else {
        path = path + "/" + target;
      }
    } else if (input[i].startsWith("$ ls")) {
      // parse files on next lines and dirs and add to fs
      while (i + 1 < input.length && !input[i + 1].startsWith("$")) {
        i++;
        if (input[i].startsWith("dir ")) {
          let name = input[i].substring(4);
          createDir(path + "/" + name);
        } else {
          let name = input[i].split(" ")[1];
          let size = input[i].split(" ")[0];
          createFile(path, name, size);
        }
      }
    }
  }

  let totalSize = getSizes(fs);

  console.log("total size:", totalSize);

  let freeSpace = 70000000 - totalSize;
  console.log("free space:", freeSpace);

  neededSpace = 30000000 - freeSpace;
  console.log("needed space", neededSpace);

  getSizes(fs);
  console.log("sum of dirs with total size at most 100000:", answer1);

  console.log("answer2", answer2);
});

function getSizes(data) {
  let sum = 0;
  Object.keys(data).forEach((key) => {
    if (data[key].length != undefined) {
      sum += parseInt(data[key]);
    } else {
      // console.log("we found a subdir", key);
      sum += getSizes(data[key]);
    }
  });
  //console.log("total directory size", data, sum);
  if (sum <= 100000) {
    // this is for answer1
    answer1 += sum;
  }
  if (neededSpace && sum > neededSpace) {
    // this is answer2
    if (!answer2 || sum < answer2) answer2 = sum;
  }
  return sum;
}

function createDir(path) {
  console.log("add dir", path);
  let cur = fs;
  path
    .split("/")
    .slice(1)
    .forEach(function (elem) {
      cur[elem] = cur[elem] || {};
      cur = cur[elem];
    });
}

function createFile(path, name, size) {
  console.log("create file", path, name, size);
  let target;
  let cur = fs;
  while (path.indexOf("/") > -1) {
    path = path.substring(1);
    target = path.split("/")[0];
    cur = cur[target];

    if (path.indexOf("/") != -1) {
      path = path.substring(path.indexOf("/"));
    }
  }
  cur[name] = size;
}
