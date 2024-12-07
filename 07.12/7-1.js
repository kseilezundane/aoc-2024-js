"use strict";

import { createReadlineInterface } from "../utils/read-file.js";

function* generatePermutations(items, length) {
    yield* req([])

    function* req(array) {
        if (array.length === length) {
            yield array
            return
        }
        for (const item of items) {
            yield* req(array.concat(item))
        }
    }
}

// retrieving all possible permutations for different operators count
// and storing results in cache
// hardcoding max operators count because reasonable calculation time ends at 11 :D
const permutationsCache = {};
for (let symbolCount = 1; symbolCount <= 11; symbolCount++) {
    permutationsCache[symbolCount] = [...generatePermutations(["*", "+", "||"], symbolCount)];
}

async function calculateCalibrationResult() {
    const readlineInterface = createReadlineInterface("input.txt");

    let totalCalibrationValue = 0;
    for await (const line of readlineInterface) {
        const numberRegex = /\d+/g;
        let numbers = line.match(numberRegex).map(element => Number(element));
        // retrieving expected result
        const expectedResult = numbers.shift();

        const operatorsCount = numbers.length - 1;
        for (const permutation of permutationsCache[operatorsCount]) {
            let result = numbers[0];
            for (let i = 1; i < numbers.length; i++) {
                if (permutation[i - 1] === "*") {
                    result *= numbers[i];
                } else {
                    result += numbers[i];
                }
            }

            if (result === expectedResult) {
                totalCalibrationValue += result;
                break;
            }
        }
    }

    console.log(totalCalibrationValue);
}

await calculateCalibrationResult();
