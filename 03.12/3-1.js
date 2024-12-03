"use strict";

import { readFile } from "../utils/read-file.js";

async function getMultiplicationsSum() {
    const fileContents = readFile("input.txt");

    const multiplicationRegex = /mul\(\d+,\d+\)/g;
    const multiplications = fileContents.matchAll(multiplicationRegex);

    let multiplicationsSum = 0;
    for (const multiplication of multiplications) {
        const numberRegex = /\d+/g;
        const factors = multiplication[0].match(numberRegex);
        const result = factors[0] * factors[1];
        multiplicationsSum += result;
    }

    console.log(multiplicationsSum);
}

await getMultiplicationsSum();
