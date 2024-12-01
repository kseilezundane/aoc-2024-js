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

    leftList.sort();
    rightList.sort();

    console.log(leftList.reduce((acc, curr, index) => {
        return Math.abs(leftList[index] - rightList[index]) + acc;
    }, 0));

}

await calculateListDistance();