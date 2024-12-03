"use strict";

import { createReadlineInterface } from "../utils/read-file.js";

async function calculateSimilarityScore() {
    const readlineInterface = createReadlineInterface("input.txt");

    let leftList = [];
    let rightList = [];

    for await (const line of readlineInterface) {
        const numbersInRow = line.split("   ");
        leftList.push(Number(numbersInRow[0]));
        rightList.push(Number(numbersInRow[1]));
    }

    const numberOccurrences = [];
    leftList.forEach(leftListEntry => {
        numberOccurrences.push(rightList.filter((rightListEntry) => {
            return rightListEntry === leftListEntry;
        }).length);
    });

    console.log(leftList.reduce((acc, curr, index) => {
        return (leftList[index] * numberOccurrences[index]) + acc;
    }, 0));

}

await calculateSimilarityScore();
