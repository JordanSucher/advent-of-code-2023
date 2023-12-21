let input = ``.split('\n').map(inp=>inp.match(/(\d+)/g))

// Part 1

let races = input[0].map((inp,i)=>[input[0][i],input[1][i]])
let winnerCounts = []

races.forEach (race=> {
    
    let maxTime = race[0]
    let minDistance = race[1]
    
    let winnerCount = 0
    
    for (let i=0;i<maxTime;i++){
        let distance = i * (maxTime-i)
        if (distance > minDistance) winnerCount++
    }

    winnerCounts.push(winnerCount)
})


let product = winnerCounts.reduce((acc, val) => {
    return acc * val
}, 1)

// Part 2

let input2 = ``.replaceAll(" ","").split('\n').map(inp=>inp.split(":")[1])

let winnerCounts2 = []


let maxTime = input2[0]
let minDistance = input2[1]

let winnerCount = 0

for (let i=0;i<maxTime;i++){
    let distance = i * (maxTime-i)
    if (distance > minDistance) winnerCount++
}

winnerCounts2.push(winnerCount)

let product2 = winnerCounts2.reduce((acc, val) => {
    return acc * val
}, 1)

console.log(product2)