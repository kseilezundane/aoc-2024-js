"use strict";

import { readFile } from "../utils/read-file.js";

const getMultiplicationsSum = (multiplications) => {
    let multiplicationsSum = 0;
    for (const multiplication of multiplications) {
        const numberRegex = /\d+/g;
        const factors = multiplication[0].match(numberRegex);
        const result = factors[0] * factors[1];
        multiplicationsSum += result;
    }
    return multiplicationsSum;
};

// alternative solution to use less space
async function getEnabledMultiplicationsSum() {
    const fileContents = readFile("input.txt");

    const multiplicationRegex = /mul\(\d+,\d+\)/g;

    let multiplicationsSum = 0;

    // since regex doesn't catch the first enabled state of the code,
    // I'm doing that myself
    const firstDo= fileContents.indexOf("do()");
    const firstDont= fileContents.indexOf("don't()");

    // getting the first sequence of enabled operations
    const firstEnabledBlock = firstDo < firstDont
        ? fileContents.substring(0, firstDo)
        : fileContents.substring(0, firstDont);
    const firstMultiplications= firstEnabledBlock.matchAll(multiplicationRegex);
    multiplicationsSum += getMultiplicationsSum(firstMultiplications);


    // retrieving the rest of the enabled blocks
    const multiplicationsToEnable = /do\(\).*?don't\(\)/gs;
    const enabledCodeBlocks= fileContents.matchAll(multiplicationsToEnable);
    for (const codeBlock of enabledCodeBlocks) {
        const enabledMultiplications = codeBlock[0].matchAll(multiplicationRegex);
        multiplicationsSum += getMultiplicationsSum(enabledMultiplications);
    }

    console.log(multiplicationsSum);
}

await getEnabledMultiplicationsSum();
