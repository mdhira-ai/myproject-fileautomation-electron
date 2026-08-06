/// <reference types="node" />
import { access, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import path, { basename } from "node:path";

export class Getfiles {
  static currentpath = process.cwd();

  static async create() {
    const { files, folders } = await this.loadFiles();
    return { files, folders, currentfolder_name: this.currentfolder_name() };
  }

  private static async loadFiles() {
    let targetPath = this.currentpath;

    try {
      const stats = await stat(targetPath);
      if (!stats.isDirectory()) {
        throw new Error("Not a directory");
      }
      await access(targetPath, constants.R_OK | constants.X_OK);
    } catch {
      targetPath = process.cwd();
      this.currentpath = targetPath;
    }

    try {
      const entries = await readdir(targetPath, { withFileTypes: true });
      const files = entries
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name);
      const folders = entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
      return { files, folders };
    } catch {
      return { files: [], folders: [] };
    }
  }

  public static currentfolder_name() {
    return basename(this.currentpath);
  }

  public static getfile_path(filename: string) {
    return path.join(this.currentpath, filename);
  }

  public static async change_dir(filename: string) {
    const targetPath = path.resolve(this.currentpath, filename);

    try {
      const stats = await stat(targetPath);
      if (!stats.isDirectory()) {
        return this.create();
      }
      await access(targetPath, constants.R_OK | constants.X_OK);
      this.currentpath = targetPath;
    } catch {
      this.currentpath = process.cwd();
    }

    return this.create();
  }

  public static async File_size(filepath: string) {
    try {
      const stats = await stat(this.getfile_path(filepath));
      console.log(`File size: ${stats.size} bytes`);
      return stats.size;
    } catch (error) {
      console.error("Error reading file size:", error);
    }
  }
}
