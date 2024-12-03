"use strict";

import { readFile } from "../utils/read-file.js";

async function getEnabledMultiplicationsSum() {
    const fileContents = readFile("input.txt");

    // since regex doesn't catch the first enabled state of the code,
    // I'm doing that myself
    const firstDo= fileContents.indexOf("do()");
    const firstDont= fileContents.indexOf("don't()");

    // cleaning up the input from parts that should be disabled
    let codeToSearch = firstDo < firstDont
        ? fileContents.substring(0, firstDo)
        : fileContents.substring(0, firstDont);

    // adding parts to be enabled to the input
    const operationsToEnable = /do\(\).*?don't\(\)/gs;
    codeToSearch += [...fileContents.matchAll(operationsToEnable)].join("");

    const multiplicationRegex = /mul\(\d+,\d+\)/g;
    const multiplications = codeToSearch.matchAll(multiplicationRegex);

    let multiplicationsSum = 0;
    for (const multiplication of multiplications) {
        const numberRegex = /\d+/g;
        const factors = multiplication[0].match(numberRegex);
        const result = factors[0] * factors[1];
        multiplicationsSum += result;
    }

    console.log(multiplicationsSum);
}

await getEnabledMultiplicationsSum();
