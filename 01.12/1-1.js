"use strict";

import createReadlineInterface from "../utils/create-readline-interface.js";

async function calculateListDistance() {
    const rl = createReadlineInterface("input.txt");

    let leftList = [];
    let rightList = [];

    for await (const line of rl) {
        const numbersInRow = line.split("   ");
        leftList.push(Number(numbersInRow[0]));
        rightList.push(Number(numbersInRow[1]));
    }

    const numberOccurrences = [];
    leftList.forEach(entry => {
        numberOccurrences.push(rightList.filter(x => x === entry).length);
    });

    console.log(leftList.reduce((acc, curr, index) => {
        return (leftList[index] * numberOccurrences[index]) + acc;
    }, 0));

}

await calculateListDistance();