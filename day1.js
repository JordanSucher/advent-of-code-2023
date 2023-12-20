let input = ``

const processInput = (input) => {
    let split = input.split('\n');
    split = split.map(x => {
        let numDict = {
            'one': `one1one`,
            'two': `two2two`,
            'three': `three3three`,
            'four': `four4four`,
            'five': `five5five`,
            'six': `six6six`,
            'seven': `seven7seven`,
            'eight': `eight8eight`,
            'nine': `nine9nine`,
        }

        let keys = Object.keys(numDict)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let pattern = new RegExp(key, 'g')
            x = x.replace(pattern, numDict[key]);
        }
        // let replaceNums = x.replace(/one|two|three|four|five|six|seven|eight|nine/g, (match) => numDict[match]);

        let stripLetters = x.replace(/[a-z]/g, '');

        let code = `${stripLetters[0]}${stripLetters[stripLetters.length - 1]}`
        return parseInt(code)
    })

    let sum = split.reduce((a, b) => a + b, 0)
    console.log(sum)

}

processInput(input)