let input = ``.split('\n').map((x)=>x.replace(/Card \d: /,"")).filter(x=>x!=="")

let totalPoints = 0

let p1 = input.map(x=>{
    
    let [winners, yours] = x.split("|")
    winners=winners.split(" ").filter(x=>x!=="")
    yours=yours.split(" ").filter(x=>x!=="")

    let overlap=0

    winners.map(w=>{
        if(yours.includes(w)){
            overlap += 1
        }
    })

    let points = overlap>0 ? Math.pow(2, overlap-1) : 0
    totalPoints += points

})


let numCards = 0
let cardDict = {}

for (i=0;i<input.length;i++) {
    cardDict[i] = 1
}


let p2 = input.map((x,index)=>{

/*
    if a card wins, you get copies of the subsequent cards.
    can use a dict to track how many copies of each card i have/
*/

    // check if curr card is a winner
    let [winners, yours] = x.split("|")
    winners=winners.split(" ").filter(x=>x!=="")
    yours=yours.split(" ").filter(x=>x!=="")

    let overlap=0

    winners.map(w=>{
        if(yours.includes(w)){
            overlap += 1
        }
    })

    // how many copies of currCard
    let currCardCopies = cardDict[index]

    // track the copies we just won
    if (overlap>0) {
        for (i=1; i<=overlap; i++) {
            let key = index + i
            cardDict[key] += currCardCopies 
        }
    }

})

let totalCards = Object.values(cardDict).reduce((acc,curr)=>acc+curr,0)

console.log(totalCards)