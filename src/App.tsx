import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { CallAPi } from "./lib/mycall";
import For_folders from "./mcomponents/For_folders";
import For_files from "./mcomponents/For_files";

function App() {
  const [mfiles, setmfiles] = useState<string[]>([]);
  const [mfolders, setmfolders] = useState<string[]>([]);
  const [currentfolder_name, setcurrentfolder_name] = useState<string>();
  const [selectedfile_size, setselectedfile_size] = useState<number>();

  const formatFileSize = (size?: number) => {
    if (size == null) return "";
    const units = ["bytes", "KB", "MB", "GB", "TB"];
    let value = size;
    let index = 0;

    while (value >= 1024 && index < units.length - 1) {
      value /= 1024;
      index += 1;
    }

    return index === 0
      ? `${value} ${units[index]}`
      : `${value.toFixed(2)} ${units[index]}`;
  };

  const mycall = useMemo(() => {
    return new CallAPi();
  }, []);

  useEffect(() => {
    mycall.first_load_check(setmfiles, setmfolders, setcurrentfolder_name);
  }, [mycall]);

  return (
    <>
      <title>lab</title>
      <div className="flex select-none divide-x max-h-fit min-h-dvh   divide-gray-700 ">
        <For_folders
          currentfolder_name={currentfolder_name}
          mycall={mycall}
          mfolders={mfolders}
          setmfiles={setmfiles}
          setmfolders={setmfolders}
          setcurrentfolder_name={setcurrentfolder_name}
        />

        <For_files mfiles={mfiles} setfilesize={setselectedfile_size} />

        <div className="absolute right-0 bottom-0">
          <p>{selectedfile_size ? formatFileSize(selectedfile_size) : ""} </p>
        </div>
      </div>
    </>
  );
}

export default App;
