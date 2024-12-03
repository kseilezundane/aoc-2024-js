"use strict";

import fs from "fs";
import readline from "readline";

export function createReadlineInterface(inputFile = "input.txt") {
    return readline.createInterface({
        input: fs.createReadStream(inputFile),
        crlfDelay: Infinity
    });
}

export function readFile(inputFile = "input.txt") {
    return fs.readFileSync(inputFile, 'utf8');
}
