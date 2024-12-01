"use strict";

import fs from "fs";
import readline from "readline";

export default function createReadlineInterface(inputFile = "input.txt") {
    return readline.createInterface({
        input: fs.createReadStream(inputFile),
        crlfDelay: Infinity
    });
};