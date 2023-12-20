
let input = ("").split('\n')

let p1 = input.map((currRow, index, arr) =>{
    // we are now looking at a single row
    for (let i=0;i<currRow.length;i++) {
        // for each cell, check if a number
        if (!isNaN(parseInt(currRow[i]))) {
            // append to currNum
            currNum += currRow[i]
            // check for symLink
            for (let j=index-1;j<=index+1;j++){
                for (let k=i-1;k<=i+1;k++){
                    let temp = arr[j] ? parseInt(arr[j][k]) : null
                    if(arr[j] && arr[j][k] !== "." && !/\d/.test(temp) && arr[j][k] !== undefined){
                        console.log("cell", arr[j][k])
                        console.log("symlink!")
                        symLink = true
                    }
                }
            }
        } 

        else{
            // if end of num and symlink true, push num to partNums
            if (currNum.length>0 && symLink) {
                console.log("currNum", currNum)
                sum += parseInt(currNum)
                partNums.push(parseInt(currNum))
                partSet.add(parseInt(currNum))
                currNum = ""
                symLink = false

            } else {
                // in all cases, reset
                currNum = ""
                symLink = false

            }
        }
    }
    
    if (symLink && currNum.length > 0) {
        sum += parseInt(currNum)
        partNums.push(parseInt(currNum))
        currNum=""
        symLink=false
    } else {
        currNum = ""
        symLink = false
    }
})



// -----------


let currNum = ""

let gears = 0 
let currGearNums = []
let gearRatios = []

let symbols = ['*','#','=','-','&','/','@','+','%','$']


let p2 = input.map((currRow, index, arr) =>{
    // we are now looking at a single row
    for (let i=0;i<currRow.length;i++) {
   
    /*
        Find a gear
        Then, loop through surrounding tiles until a number is found
        Then, traverse the row to get the full number
        Track currGearNums
        Once done looping through surrounding tiles, if there are exactly 2 currGearNums, multiply and save to gearRatios
    */

        if(currRow[i]=="*") {
            // a gear! loop around the surrounding cells!
            for (let j=index-1;j<=index+1;j++){
                for(let k=i-1;k<=i+1;k++){
                    if(!isNaN(parseInt(arr[j][k]))) {
                        // we have found a number!
                        // push to currNum
                        currNum += arr[j][k]
                        // crawl to the left
                        let cell = k-1
                        while (!isNaN(parseInt(arr[j][cell]))){
                            currNum = arr[j][cell] + currNum
                            cell -= 1
                        }
                        // crawl to the right
                        cell = k+1
                        while (!isNaN(parseInt(arr[j][cell]))){
                            currNum += arr[j][cell]
                            cell += 1
                        }

                        // push to gearNums and reset
                        currGearNums.push(currNum)
                        currNum = ""
                    }
                }
            }
            // dedupe gearNums
            let deduped = []
            currGearNums.map((x)=>{
                if(!deduped.includes(x)){
                    deduped.push(x)
                }
            })

            // if there are 2 gear nums, add product to gearRatios
            if(deduped.length == 2){
                let product = parseInt(deduped[0]) * parseInt(deduped[1])
                gearRatios.push(product)
            }
            // either way, reset currGearNums
            currGearNums = []
        }
    }
})

console.log(gearRatios.reduce((acc, curr) => acc+curr,0))
