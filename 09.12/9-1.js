"use strict";

import { readFile } from "../utils/read-file.js";

async function calculateChecksum() {
    const condensedDiskMap = readFile("input.txt");

    let isFile = true;
    let fileIndex = 0;

    // constructing full disk map by adding required breaks/files
    let fullDiskMap = [];
    for (const entryLength of condensedDiskMap) {
        if (isFile) {
            fullDiskMap.push(...Array(Number(entryLength)).fill(fileIndex));
            fileIndex++;
            isFile = false;
        } else {
            fullDiskMap.push(...Array(Number(entryLength)).fill("."));
            isFile = true;
        }
    }

    // parsing through the map and moving file contents
    // to the available empty spaces
    for (let i = 0; i < fullDiskMap.length; i++) {
        if (fullDiskMap[i] === ".") {
            for (let j = fullDiskMap.length - 1; j > i; j--) {
                if (fullDiskMap[j] !== ".") {
                    fullDiskMap[i] = fullDiskMap[j];
                    fullDiskMap.splice(j, 1);
                    break;
                }
            }
        }
    }

    console.log(fullDiskMap.reduce((acc, curr, index) => {
        if (curr !== ".") {
            return acc + (curr * index);
        }
        return acc;
    }, 0));
}

await calculateChecksum();
