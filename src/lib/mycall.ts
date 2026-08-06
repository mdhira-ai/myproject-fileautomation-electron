interface CheckFilesResult {
  files: string[];
  folders: string[];
  currentfolder_name: string;
}

interface ElectronAPI {
  platform: string;
  checkfiles: () => Promise<CheckFilesResult>;
  changeDir: (folderName: string) => Promise<CheckFilesResult>;
  check_file_size: (filepath: string) => Promise<any>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export class CallAPi {
  /**
   * first_load_check
   */
  public first_load_check(
    setmfiles?: any,
    setmfolders?: any,
    setcurrentfolder_name?: any,
  ) {
    console.log("[CallAPi] first_load_check");
    window.electronAPI
      ?.checkfiles?.()
      .then((files) => {
        console.log("[CallAPi] checkfiles result", files);
        setmfiles(files?.files);
        setmfolders(files?.folders);
        setcurrentfolder_name(files.currentfolder_name);
      })
      .catch((error) => {
        console.error("[CallAPi] checkfiles error", error);
      });
  }

  /**
         * this function used when user want
         * change Directory
           
           */
  public handle_changeDir(
    filename: string,
    setmfiles?: any,
    setmfolders?: any,
    setcurrentfolder_name?: any,
  ) {
    console.log("[CallAPi] handle_changeDir", filename);
    window.electronAPI
      ?.changeDir(filename)
      .then((files) => {
        console.log("[CallAPi] changeDir result", files);
        setmfiles(files?.files);
        setmfolders(files?.folders);
        setcurrentfolder_name(files?.currentfolder_name);
      })
      .catch((error) => {
        console.error("[CallAPi] changeDir error", error);
      });
  }

  /**
   * file_size
   */
  public file_size(filepath: string) {
    return window.electronAPI?.check_file_size(filepath);
  }
}
