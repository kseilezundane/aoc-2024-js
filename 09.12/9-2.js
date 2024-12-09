"use strict";

import { readFile } from "../utils/read-file.js";

async function calculateOptimizedChecksum() {
    const condensedDiskMap = readFile("input.txt");

    let isFile = true;
    let fileIndex = 0;

    // constructing full disk map by adding required breaks/files
    let fullDiskMap = [];
    for (const entryLength of condensedDiskMap) {
        if (isFile) {
            fullDiskMap.push(Array(Number(entryLength)).fill(fileIndex));
            fileIndex++;
            isFile = false;
        } else {
            if (entryLength > 0) {
                fullDiskMap.push(Array(Number(entryLength)).fill("."));
            }
            isFile = true;
        }
    }

    for (let i = fullDiskMap.length - 1; i >= 0; i--) {
        // checking whether current entry is a code block
        // if yes - we start searching for empty segments in the memory
        if (!fullDiskMap[i].includes(".")) {
            for (let j = 0; j < i; j++) {
                // if empty segment found - we're
                // checking whether there are long enough empty segments
                // that can hold our code block
                if (fullDiskMap[j].includes(".")) {
                    const requiredSegmentLength = fullDiskMap[i].length;
                    let currentSegmentLength = 0
                    let segmentStartIndex = -1;
                    for (let m = 0; m < fullDiskMap[j].length; m++) {
                        if (fullDiskMap[j][m] === ".") {
                            currentSegmentLength++;
                            if (segmentStartIndex === -1) {
                                segmentStartIndex = m;
                            }
                        } else {
                            currentSegmentLength = 0;
                            segmentStartIndex = -1;
                        }
                        if (currentSegmentLength === requiredSegmentLength) {
                            break;
                        }
                    }

                    // migrating the code block if there is enough empty space
                    if (currentSegmentLength === requiredSegmentLength && segmentStartIndex !== -1) {
                        for (let m = 0; m < fullDiskMap[i].length; m++) {
                            fullDiskMap[j][segmentStartIndex] = fullDiskMap[i][m];
                            fullDiskMap[i][m] = ".";
                            segmentStartIndex++;
                        }
                        break;
                    }
                }
            }
        }
    }

    // removing nested arrays
    fullDiskMap = fullDiskMap.flat();

    console.log(fullDiskMap.reduce((acc, curr, index) => {
        if (curr !== ".") {
            return acc + (curr * index);
        }
        return acc;
    }, 0));
}

await calculateOptimizedChecksum();
