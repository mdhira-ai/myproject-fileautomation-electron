import { useState } from "react";

import "./App.css";
import { Button } from "./components/ui/button";
import { Folder } from "lucide-react";

declare global {
  interface Window {
    electronAPI: {
      platform: string;
    };
  }
}

function App() {
  return (
    <>
      <div className="flex divide-x h-dvh   divide-gray-700 ">
        <div className="w-50 flex flex-col  ">
          <label className="bg-slate-800 p-2 border border-amber-900">
            folders
          </label>

          <div>
            <Button className={"rounded-none"}>
              <Folder />
              myfolder
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-col ">
          <label className="bg-slate-800 p-2 border border-amber-900">
            folders
          </label>
          <div>
            <Button className={"rounded-none"}>
              <Folder />
              my files
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
