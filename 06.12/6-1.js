"use strict";

import { createReadlineInterface } from "../utils/read-file.js";

async function predictGuardPath() {
    const readlineInterface = createReadlineInterface("input.txt");

    const labMap = [];
    const guardPosition = {
      x: -1,
      y: -1
    };

    // impossible to retrieve index of async reading, so I'm making it myself :D
    let lineCount = 0;
    for await (const line of readlineInterface) {
        labMap.push(line.split(""));
        // retrieving initial coordinates of the guard
        const guardIndex = line.indexOf("^");
        if (guardIndex !== -1) {
            guardPosition.x = guardIndex;
            guardPosition.y = lineCount;
        }
        lineCount++;
    }

    let stepCount = 0;
    let currentDirection = "up";
    const guardMoves = {
        up: (coordinates) => { coordinates.y-- },
        down: (coordinates) => { coordinates.y++ },
        left: (coordinates) => { coordinates.x-- },
        right: (coordinates) => { coordinates.x++ },
    };
    // marking current guard position as visited and
    // moving the guard up (in a default direction)
    labMap[guardPosition.y][guardPosition.x] = "X";
    guardPosition.y = guardPosition.y - 1;
    stepCount++;
    // searching while guard is in the map borders
    while (
        guardPosition.y >= 0 && guardPosition.y < lineCount &&
        guardPosition.x >= 0 && guardPosition.x < labMap[0].length
        ) {
        if (labMap[guardPosition.y][guardPosition.x] !== "#") {
            if (labMap[guardPosition.y][guardPosition.x] !== "X") {
                labMap[guardPosition.y][guardPosition.x] = "X";
                stepCount++;
            }
            guardMoves[currentDirection](guardPosition);
        } else {
            if (currentDirection === "up") {
                guardPosition.y++;
                currentDirection = "right";
            } else if (currentDirection === "down") {
                guardPosition.y--;
                currentDirection = "left";
            } else if (currentDirection === "left") {
                guardPosition.x++;
                currentDirection = "up";
            } else {
                guardPosition.x--;
                currentDirection = "down";
            }
        }
    }

    console.log(stepCount);
}

await predictGuardPath();
