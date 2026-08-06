import { Button } from "@/components/ui/button";
import { CallAPi } from "@/lib/mycall";
import { Folder, Plus, Search } from "lucide-react";
import { useMemo } from "react";

interface ForFileProps {
  mfiles: string[];
  setfilesize: (size: number) => void;
}

function For_files({ mfiles, setfilesize }: ForFileProps) {

  const mycall = useMemo(() => {
    return new CallAPi();
  }, []);

  async function Get_file_size(filename: string) {
    const d = await mycall.file_size(filename);
    console.log(`this is selected file size of ${filename}: ${d}`);
    setfilesize(d);
  }


  return (
    <div className="w-full flex flex-col gap-3 bg-slate-950/60 p-4 rounded-sm">
      <div className="rounded-sm flex flex-row justify-between items-center bg-slate-800 px-3 py-2  text-slate-300 border border-amber-900">
        <label className="tracking-[0.25em] text-xs uppercase text-slate-300 ">
          files
        </label>

        <div className="flex flex-row gap-4 items-center">
          <Plus size={26} className="hover:text-amber-50 text-[#00ff78]" />
          <Search className="hover:text-amber-50 text-[#00ff78]" />
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-3">
        {mfiles?.map((t, index) => (
          <Button
            key={index}
            onClick={() => Get_file_size(t) }
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
  );
}

export default For_files;
