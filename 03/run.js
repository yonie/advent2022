var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('03/input')
    //input: require('fs').createReadStream('03/test')
});

let input = []

lineReader.on('line', function (line) {

    input.push(line)

})

lineReader.on('close', function () {

    console.log("amount of lines:", input.length)

    let sum = 0

    input.forEach(function (line) {

        let item = findCommonItem(line)
        console.log("common item:", item)

        let priority = findPriority(item)

        sum += priority

    })

    console.log(sum)

    let sum2 = 0

    for (let i = 0; i < input.length; i = i + 3) {

        let item = findCommonItem2(input[i], input[i + 1], input[i + 2])

        console.log("common item:", item)

        let priority = findPriority(item)

        sum2 += priority

    }

    console.log(sum2)
})

function findCommonItem2(item1, item2, item3) {
    console.log(item1,item2,item3)
    let a1 = Array.from(item1)
    let a2 = Array.from(item2)
    let a3 = Array.from(item3)

    let foundChar

    a1.forEach(function (char1) {
        a2.forEach(function (char2) {
            a3.forEach(function (char3) {
                if (char1 == char2 && char2 == char3) foundChar = char1
            })
        })
    })

    return foundChar
}

function findCommonItem(ruckSack) {
    let leftSide = Array.from(ruckSack.slice(0, ruckSack.length / 2))
    let rightSide = Array.from(ruckSack.slice(ruckSack.length / 2))

    let foundItem

    leftSide.forEach(function (leftSideItem) {
        rightSide.forEach(function (rightSideItem) {
            if (leftSideItem == rightSideItem) foundItem = leftSideItem
        })
    })

    return foundItem
}

function findPriority(item) {
    let priority
    if (item.toLowerCase() == item) priority = item.charCodeAt() - 96
    else priority = item.charCodeAt() - 38
    return priority
}