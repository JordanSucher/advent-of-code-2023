let games

let split = games.split('\n');

function colorSum(array) {
    return array.reduce((acc,curr)=>{
        let num = curr.match(/(\d+)/)
        return acc + parseInt(num)
    }, 0)
}

function colorMax(array) {
    return array.reduce((acc, curr)=>{
        let num = parseInt(curr.match(/(\d+)/))
        return num>acc ? num : acc
    }, 0)

}

let [redMax, greenMax, blueMax] = [12, 13, 14]

let part1 = split.map(x => {
    let id = x.match(/Game (\d+)/)[1];
    x = x.replace(/Game \d+:/, '');
    let reds = x.match(/(\d+) red/g);
    let greens = x.match(/(\d+) green/g);
    let blues = x.match(/(\d+) blue/g);
    let redsum = colorMax(reds)
    let greensum = colorMax(greens)
    let bluesum = colorMax(blues)

    
    if(redsum <= redMax && greensum <= greenMax && bluesum <= blueMax) {
        return id
    } else {
        return 0
    }
    
}).reduce((acc, curr)=>acc+parseInt(curr),0)


let part2 = split.map(x => {
    let id = x.match(/Game (\d+)/)[1];
    x = x.replace(/Game \d+:/, '');
    let reds = x.match(/(\d+) red/g);
    let greens = x.match(/(\d+) green/g);
    let blues = x.match(/(\d+) blue/g);
    let redMax = colorMax(reds)
    let greenMax = colorMax(greens)
    let blueMax = colorMax(blues)

    
    return redMax*greenMax*blueMax
    
}).reduce((acc, curr)=>acc+parseInt(curr),0)

