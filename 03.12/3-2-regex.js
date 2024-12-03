"use strict";

import { readFile } from "../utils/read-file.js";

// alternative solution to use less space
async function getEnabledMultiplicationsSum() {
    const fileContents = readFile("input.txt");

    /* regex to retrieve all blocks to enable;
     * consists of 2 parts:
     * 1. (^.*?(?=(do\(\))|(don't\(\))))
     * that retrieves the fragment from the beginning of file
     * until the first do/don't keyword
     * 2. (do\(\).*?don't\(\))
     * retrieves enabled fragments - everything between do() and don't() calls
     * /gs ensures that all matches are found and line endings are included in regex's wildcard
     */
    const enabledCodeBlocksRegex = /(^.*?(?=(do\(\))|(don't\(\))))|(do\(\).*?don't\(\))/gs;
    const enabledCodeBlocks= fileContents.matchAll(enabledCodeBlocksRegex);

    let multiplicationsSum = 0;
    const multiplicationRegex = /mul\(\d+,\d+\)/g;
    for (const codeBlock of enabledCodeBlocks) {
        const multiplications = codeBlock[0].matchAll(multiplicationRegex);
        for (const multiplication of multiplications) {
            const numberRegex = /\d+/g;
            const factors = multiplication[0].match(numberRegex);
            const result = factors[0] * factors[1];
            multiplicationsSum += result;
        }
    }

    console.log(multiplicationsSum);
}

await getEnabledMultiplicationsSum();
