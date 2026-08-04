"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getfiles = void 0;
const promises_1 = require("node:fs/promises");
class Getfiles {
    files;
    constructor() {
        this.files = this.loadFiles();
    }
    async loadFiles() {
        console.log(process.cwd());
        return await (0, promises_1.readdir)(process.cwd());
    }
}
exports.Getfiles = Getfiles;
