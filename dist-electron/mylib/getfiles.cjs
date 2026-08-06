"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getfiles = void 0;
/// <reference types="node" />
const promises_1 = require("node:fs/promises");
const node_fs_1 = require("node:fs");
const node_path_1 = __importStar(require("node:path"));
class Getfiles {
    static currentpath = process.cwd();
    static async create() {
        const { files, folders } = await this.loadFiles();
        return { files, folders, currentfolder_name: this.currentfolder_name() };
    }
    static async loadFiles() {
        let targetPath = this.currentpath;
        try {
            const stats = await (0, promises_1.stat)(targetPath);
            if (!stats.isDirectory()) {
                throw new Error("Not a directory");
            }
            await (0, promises_1.access)(targetPath, node_fs_1.constants.R_OK | node_fs_1.constants.X_OK);
        }
        catch {
            targetPath = process.cwd();
            this.currentpath = targetPath;
        }
        try {
            const entries = await (0, promises_1.readdir)(targetPath, { withFileTypes: true });
            const files = entries
                .filter((entry) => entry.isFile())
                .map((entry) => entry.name);
            const folders = entries
                .filter((entry) => entry.isDirectory())
                .map((entry) => entry.name);
            return { files, folders };
        }
        catch {
            return { files: [], folders: [] };
        }
    }
    static currentfolder_name() {
        return (0, node_path_1.basename)(this.currentpath);
    }
    static getfile_path(filename) {
        return node_path_1.default.join(this.currentpath, filename);
    }
    static async change_dir(filename) {
        const targetPath = node_path_1.default.resolve(this.currentpath, filename);
        try {
            const stats = await (0, promises_1.stat)(targetPath);
            if (!stats.isDirectory()) {
                return this.create();
            }
            await (0, promises_1.access)(targetPath, node_fs_1.constants.R_OK | node_fs_1.constants.X_OK);
            this.currentpath = targetPath;
        }
        catch {
            this.currentpath = process.cwd();
        }
        return this.create();
    }
    static async File_size(filepath) {
        try {
            const stats = await (0, promises_1.stat)(this.getfile_path(filepath));
            console.log(`File size: ${stats.size} bytes`);
            return stats.size;
        }
        catch (error) {
            console.error("Error reading file size:", error);
        }
    }
}
exports.Getfiles = Getfiles;
