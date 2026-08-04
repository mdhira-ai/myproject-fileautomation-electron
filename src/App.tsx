import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Folder } from "lucide-react";

interface CheckFilesResult {
  files: string[];
  folders: string[];
  currentfolder_name: string;
}

interface ElectronAPI {
  platform: string;
  checkfiles: () => Promise<CheckFilesResult>;
  changeDir: (folderName: string) => Promise<CheckFilesResult>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

function App() {
  const [mfiles, setmfiles] = useState<string[]>([]);
  const [mfolders, setmfolders] = useState<string[]>([]);
  const [currentfolder_name, setcurrentfolder_name] = useState<string>();

  useEffect(() => {
    void window.electronAPI
      ?.checkfiles?.()
      .then((files) => {
        setmfiles(files?.files);
        setmfolders(files?.folders);
        setcurrentfolder_name(files.currentfolder_name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handle_changeDir(filename: string) {
    window.electronAPI
      ?.changeDir(filename)
      .then((files) => {
        setmfiles(files?.files);
        setmfolders(files?.folders);
        setcurrentfolder_name(files?.currentfolder_name);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <title>lab</title>
      <div className="flex select-none divide-x max-h-fit min-h-dvh   divide-gray-700 ">
        <div className="max-w-50 min-w-50   flex flex-col gap-3 bg-slate-950/60 p-4 rounded-sm">
          <label className="rounded-sm overflow-hidden bg-slate-800 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-300 border border-amber-900">
            {currentfolder_name}
          </label>

          <div className="rounded-none flex flex-col  ">
            <Button
              onClick={() => handle_changeDir("..")}
              className={"rounded-none bg-slate-900 justify-start  "}
            >
              <span>..</span>
            </Button>
          </div>

          <div className="rounded-none max-h-[calc(100vh-8rem)] min-h-0 flex-1 gap-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700/70 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full flex flex-col  ">
            {mfolders?.map((f, index) => (
              <Button
                key={index}
                onClick={() => handle_changeDir(f)}
                className={"rounded-none bg-slate-900 justify-start  "}
              >
                <Folder />
                <span>{f}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 bg-slate-950/60 p-4 rounded-sm">
          <label className="rounded-sm bg-slate-800 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-300 border border-amber-900">
            files
          </label>
          <div className="flex flex-row flex-wrap gap-3">
            {mfiles?.map((t) => (
              <Button
                key={t}
                className=" max-w-56 min-w-40 overflow-hidden  bg-slate-900 px-4 py-5 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 flex flex-col items-start gap-3"
              >
                <div className="flex items-center gap-2 text-slate-100">
                  <Folder className="h-5 w-5 text-amber-300" />
                  <span className="font-semibold truncate">{t}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
