var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('04/input')
    //input: require('fs').createReadStream('04/test')
});

let input = []

lineReader.on('line', function (line) {

    input.push(line)

})

lineReader.on('close', function () {

    console.log("amount of lines:", input.length)

    let sum = 0
    let sum2 = 0

    input.forEach(function (line) {

        let leftOrder = {}
        leftOrder[0] = parseInt(line.split(",")[0].split("-")[0])
        leftOrder[1] = parseInt(line.split(",")[0].split("-")[1])
        let rightOrder = {}
        rightOrder[0] = parseInt(line.split(",")[1].split("-")[0])
        rightOrder[1] = parseInt(line.split(",")[1].split("-")[1])

        if (checkFullOverlap(leftOrder, rightOrder) || checkFullOverlap(rightOrder, leftOrder)) {
            sum += 1
        }
        if (checkPartialOverlap(leftOrder, rightOrder) || checkPartialOverlap(rightOrder, leftOrder)) sum2 += 1

    })

    console.log("full overlaps:", sum)

    console.log("partial overlaps:", sum2)

})

function checkFullOverlap(first, second) {
    let found = false
    if (first[0] >= second[0] && first[1] <= second[1]) found = true
    console.log(first[0], first[1], "--", second[0], second[1], found)
    return found
}

function checkPartialOverlap(first, second) {
    let found = false
    if (first[0] >= second[0] && first[0] <= second[1]) found = true
    console.log(first[0], first[1], "--", second[0], second[1], found)
    return found
}