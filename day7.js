let input = ``.split("\n")

let hands = input.map(inp=>inp.split(" "))

const getType = (hand) => {
    let type
    let handCount = {}
    
    for (let label of hand[0]) {
        if (handCount[label]) {
            handCount[label] ++
        } else {
            handCount[label] = 1
        }
    }

    if (Object.keys(handCount).length == 1) {
        type = 'five'
    }

    else if (Object.keys(handCount).length == 2 && Math.max(...Object.values(handCount)) == 4) {
        type = 'four'
    }

    else if (Object.keys(handCount).length == 2 && Math.min(...Object.values(handCount)) == 2) {
        type = 'full'
    }
    
    else if (Object.keys(handCount).length == 3 && Math.min(...Object.values(handCount)) == 1 && Math.max(...Object.values(handCount)) == 3) {
        type = 'three'
    }

    else if (Object.keys(handCount).length == 3 && Math.min(...Object.values(handCount)) == 1 && Math.max(...Object.values(handCount)) == 2) {
        type = 'twopair'
    }

    else if (Object.keys(handCount).length == 4) {
        type = 'pair'
    }

    else {
        type = 'high'
    }

    return type

}

const splitByTypes = (hands) => {
    let [fives, fours, fulls, threes, twopairs, pairs, highs] = [[],[],[],[],[],[],[]]

    hands.forEach(hand=>{
        let type = getType(hand)
        switch (type) {
            case 'five':
                fives.push(hand)
                break;
            case 'four':
                fours.push(hand)
                break;
            case 'full':
                fulls.push(hand)
                break;
            case 'three':
                threes.push(hand)
                break;
            case 'twopair':
                twopairs.push(hand)
                break;
            case 'pair':
                pairs.push(hand)
                break;
            case 'high':
                highs.push(hand)
                break;
            default:
                console.log('no match')
        }
    })
    
    return {fives, fours, fulls, threes, twopairs, pairs, highs}

}

let sortByHighestCard = (hands) => {
    let tiers = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']

    let sorted = hands.sort((a, b) => {
        let aTier
        let bTier
        let sorted = false
        let index = 0

        while (!sorted && index < 5) {
            aTier = tiers.indexOf(a[0][index])
            bTier = tiers.indexOf(b[0][index])

            if (aTier !== bTier) {
                sorted = true
            }
            index ++
        }
        return aTier - bTier
    })

    return sorted
}

const sortAllHands = (hands) => {

    let splitHands = splitByTypes(hands)
    let sortedFives = sortByHighestCard(splitHands.fives)
    let sortedFours = sortByHighestCard(splitHands.fours)
    let sortedFulls = sortByHighestCard(splitHands.fulls)
    let sortedThrees = sortByHighestCard(splitHands.threes)
    let sortedTwoPairs = sortByHighestCard(splitHands.twopairs)
    let sortedPairs = sortByHighestCard(splitHands.pairs)
    let sortedHighs = sortByHighestCard(splitHands.highs)


    let fullySorted = sortedFives.concat(sortedFours).concat(sortedFulls).concat(sortedThrees).concat(sortedTwoPairs).concat(sortedPairs).concat(sortedHighs)

    return fullySorted  
}

const scoreSorted = (sortedHands) => {

    let scores = sortedHands.map((hand, index, array)=>{
        let score = hand[1] * (array.length - index)
        return score
    })

    let total = scores.reduce((acc, val)=>acc+=val,0)
    return total
}

const p1 = (hands=>{
    return scoreSorted(sortAllHands(hands))
})

console.log(p1(hands))


// Part 2

const getType2 = (hand) => {
    let type
    let handCount = {}
    
    for (let label of hand[0]) {
        if (handCount[label]) {
            handCount[label] ++
        } else {
            handCount[label] = 1
        }
    }

    // modify handCount dict to account for J
    if(handCount['J']) {

        // get max keyval pair
        let keys = Object.keys(handCount).filter(key=>key!=='J')
        let maxKey = [null, 0]
        keys.forEach(key=>{
            if(parseInt(handCount[key]) > maxKey[1]) {
                maxKey = [key,parseInt(handCount[key])]
            }
        })

        // add Js to it
        handCount[maxKey[0]] += handCount['J']

        // remove J from handCount
        delete handCount['J']
    }

    if (Object.keys(handCount).length == 1) {
        type = 'five'
    }

    else if (Object.keys(handCount).length == 2 && Math.max(...Object.values(handCount)) == 4) {
        type = 'four'
    }

    else if (Object.keys(handCount).length == 2 && Math.min(...Object.values(handCount)) == 2) {
        type = 'full'
    }
    
    else if (Object.keys(handCount).length == 3 && Math.min(...Object.values(handCount)) == 1 && Math.max(...Object.values(handCount)) == 3) {
        type = 'three'
    }

    else if (Object.keys(handCount).length == 3 && Math.min(...Object.values(handCount)) == 1 && Math.max(...Object.values(handCount)) == 2) {
        type = 'twopair'
    }

    else if (Object.keys(handCount).length == 4) {
        type = 'pair'
    }

    else {
        type = 'high'
    }

    return type

}

const splitByTypes2 = (hands) => {
    let [fives, fours, fulls, threes, twopairs, pairs, highs] = [[],[],[],[],[],[],[]]

    hands.forEach(hand=>{
        let type = getType2(hand)
        switch (type) {
            case 'five':
                fives.push(hand)
                break;
            case 'four':
                fours.push(hand)
                break;
            case 'full':
                fulls.push(hand)
                break;
            case 'three':
                threes.push(hand)
                break;
            case 'twopair':
                twopairs.push(hand)
                break;
            case 'pair':
                pairs.push(hand)
                break;
            case 'high':
                highs.push(hand)
                break;
            default:
                console.log('no match')
        }
    })
    
    return {fives, fours, fulls, threes, twopairs, pairs, highs}

}

let sortByHighestCard2 = (hands) => {
    let tiers = ['A','K','Q','T','9','8','7','6','5','4','3','2', 'J']

    let sorted = hands.sort((a, b) => {
        let aTier
        let bTier
        let sorted = false
        let index = 0

        while (!sorted && index < 5) {
            aTier = tiers.indexOf(a[0][index])
            bTier = tiers.indexOf(b[0][index])

            if (aTier !== bTier) {
                sorted = true
            }
            index ++
        }
        return aTier - bTier
    })

    return sorted
}

const sortAllHands2 = (hands) => {

    let splitHands = splitByTypes2(hands)
    let sortedFives = sortByHighestCard2(splitHands.fives)
    let sortedFours = sortByHighestCard2(splitHands.fours)
    let sortedFulls = sortByHighestCard2(splitHands.fulls)
    let sortedThrees = sortByHighestCard2(splitHands.threes)
    let sortedTwoPairs = sortByHighestCard2(splitHands.twopairs)
    let sortedPairs = sortByHighestCard2(splitHands.pairs)
    let sortedHighs = sortByHighestCard2(splitHands.highs)


    let fullySorted = sortedFives.concat(sortedFours).concat(sortedFulls).concat(sortedThrees).concat(sortedTwoPairs).concat(sortedPairs).concat(sortedHighs)

    return fullySorted  
}

const scoreSorted2 = (sortedHands) => {

    let scores = sortedHands.map((hand, index, array)=>{
        let score = hand[1] * (array.length - index)
        return score
    })

    let total = scores.reduce((acc, val)=>acc+=val,0)
    return total
}

const p2 = (hands=>{
    return scoreSorted2(sortAllHands2(hands))
})

console.log(p2(hands))