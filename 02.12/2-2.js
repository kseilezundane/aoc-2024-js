"use strict";

import { createReadlineInterface } from "../utils/read-file.js";

// checks if array is ascending and difference between neighbors is not bigger than 3
const isAscending = (array) => {
    return array.every((currentValue, index) => {
        if (index === array.length - 1) {
            return true;
        }
        return (currentValue < array[index + 1]) && (Math.abs(currentValue - array[index + 1]) <= 3);
    });
};

// checks if array is descending and difference between neighbors is not bigger than 3
const isDescending = (array) => {
    return array.every((currentValue, index) => {
        if (index === array.length - 1) {
            return true;
        }
        return currentValue > array[index + 1] && (Math.abs(currentValue - array[index + 1]) <= 3);
    });
};

async function findSafeReports() {
    const readlineInterface = createReadlineInterface("input.txt");

    let safeReports = 0;
    for await (const line of readlineInterface) {
        let reportValues = line.split(" ");
        reportValues = reportValues.map((element) => Number(element));
        // dropping each number from a report to check if it becomes safe without one of them
        for (let i = 0; i < reportValues.length; i++) {
            const newValues = reportValues.toSpliced(i, 1);
            if (isDescending(newValues) || isAscending(newValues)) {
                safeReports++;
                break;
            }
        }
    }

    console.log(safeReports);
}

await findSafeReports();
