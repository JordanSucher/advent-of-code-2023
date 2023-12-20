let input = ``;

/*

going from seeds to location...
first, lets think abt going from seed to soil programmatically
we want a function to take a seed #, a series of seed-to-soil mappings, and produce an output
how could we represent/process the mappings to let this happen...
one way would be to iterate through the mappings, which seems sub optimal?
another would be to produce a comprehensive mapping per mapset and reuse it, which could be better?
a third would be to create a source range tracker of some kind and use that as a prelim check before then iterating to do the actual translation. that seems... unlikely to be more performant than simply creating a comprehensive mapping. so lets do that, to start
*/

// let mappings = [[50,98,2],[52,50,48]]

// let mapDict = {}

// mappings.forEach(mapping => {
//     // first, fill dict for all mappings
//     for (let i=0;i<mapping[2];i++) {
//         mapDict[mapping[1]+i] = mapping[0]+i
//     }
//     // then, fill in gaps
//     for (let j=0;j<100;j++){
//         if(!mapDict[j]) {
//             mapDict[j] = j
//         }
//     }
// })

// console.log(mapDict)

// Sweet. Now lets figure out how to get the input into this format.

const turnInputIntoMappings = () => {
  let input2 = input.split("\n\n");
  let mappingsGroups = [];
  let pattern = /(\d+)/g;

  for (let j = 1; j < input2.length; j++) {
    let mappings = [];
    let mappingsUngrouped = input2[j].match(pattern);
    for (let i = 0; i < mappingsUngrouped.length; i += 3) {
      mappings.push([
        parseInt(mappingsUngrouped[i]),
        parseInt(mappingsUngrouped[i + 1]),
        parseInt(mappingsUngrouped[i + 2]),
      ]);
    }

    mappingsGroups.push(mappings);
  }

  return mappingsGroups;
};

// sick, now lets stick it all together

// const getMinimumLocation = () => {
//     let allMapGroups = turnInputIntoMappings()

//     let mapInput = input.split('\n\n')[0].match(/(\d+)/g)

//     allMapGroups.forEach(mappings => {
//         let mapDict = {}

//         mappings.forEach(mapping => {
//             console.log("mapping", mapping)
//             // first, fill dict for all mappings
//             for (let i=0;i<mapping[2];i++) {
//                 console.log(i)
//                 mapDict[mapping[1]+i] = mapping[0]+i
//             }
//             // then, fill in gaps
//             for (let j=0;j<mapping[2]+mapping[2]+mapping[3];j++){
//                 if(!mapDict[j]) {
//                     mapDict[j] = j
//                 }
//             }
//         })

//         console.log("mapDict", mapDict)

//         let transformedInput = []
//         mapInput.forEach(input=>{
//             transformedInput.push(mapDict[input])
//         })

//         mapInput = transformedInput

//     })

//     let minLocation = Math.min(...mapInput)
//     return minLocation
// }

// this didnt work at all! my intuition was way off, because the actual #s are so high that creating a mapping dict is actually WAY more intensive than iterating over the mappings once per input. trying again

const p1 = () => {
  let allMapGroups = turnInputIntoMappings();
  let mapInput = input.split("\n\n")[0].match(/(\d+)/g);

  allMapGroups.forEach((mappings) => {
    let transformedInputs = [];

    mapInput.forEach((input) => {
      let relMapping = mappings.filter(
        (mapping) => input > mapping[1] && input < mapping[1] + mapping[2]
      );

      let transformedInput;
      if (relMapping.length > 0) {
        transformedInput = input - relMapping[0][1] + relMapping[0][0];
      } else {
        transformedInput = input;
      }

      transformedInputs.push(transformedInput);
    });

    mapInput = transformedInputs;
  });

  let minLocation = Math.min(...mapInput);
  console.log(minLocation);
  return minLocation;
};

// p1()

// --- Part Two ---

let mapInputRaw = input.split("\n\n")[0].match(/(\d+)/g);
let mapInput = [];

for (let i = 0; i < mapInputRaw.length; i += 2) {
  mapInput.push([mapInputRaw[i], mapInputRaw[i + 1]]);
}

const p2 = () => {
  let allMapGroups = turnInputIntoMappings();
  let mapInputRaw = input.split("\n\n")[0].match(/(\d+)/g);
  let mapInput = [];
  let minLocations = [];

  for (let i = 0; i < mapInputRaw.length; i += 2) {
    mapInput.push([parseInt(mapInputRaw[i]), parseInt(mapInputRaw[i + 1])]);
  }

  mapInput.forEach((inputPair) => {
    // batch processing

    let batchSize = 100000;
    for (let i = 0; i < inputPair[1]; i += batchSize) {
      let batchSeedArray = [];
      for (j = i; j < i + batchSize && j < inputPair[1]; j++) {
        batchSeedArray.push(inputPair[0] + j);
      }

      allMapGroups.forEach((mappings) => {
        let transformedInputs = [];
        let mappingCache;
        let relMapping;

        batchSeedArray.forEach((seed) => {
        // use cached mapping if possible
          if (
            mappingCache &&
            seed >= mappingCache[1] &&
            seed < mappingCache[1] + mappingCache[2]
          ) {
            relMapping = mappingCache;
          } else {
            relMapping = mappings.filter(
              (mapping) => seed >= mapping[1] && seed < mapping[1] + mapping[2]
            );
            mappingCache = relMapping;
          }

        // account for case when no mapping
          let transformedInput;
          if (relMapping && relMapping.length > 0) {
            transformedInput = seed - relMapping[0][1] + relMapping[0][0];
          } else {
            transformedInput = seed;
          }

          transformedInputs.push(transformedInput);
        });
        batchSeedArray = transformedInputs;
      });

      // we have processed a batch of seeds, calc the local min location
      let minLocation = Math.min(...batchSeedArray);
      minLocations.push(minLocation);
    }
  });

  // we have processed all batches of seeds, can calculate global minimum
  let globalMinimum = Math.min(...minLocations);

  console.log(globalMinimum);
  return globalMinimum;
};

p2();
