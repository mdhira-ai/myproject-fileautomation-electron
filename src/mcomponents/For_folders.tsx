import { Button } from "@/components/ui/button"
import { Folder } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import type { CallAPi } from "../lib/mycall"

interface ForFoldersProps {
    currentfolder_name?: string
    mycall: CallAPi
    mfolders: string[]
    setmfiles: Dispatch<SetStateAction<string[]>>
    setmfolders: Dispatch<SetStateAction<string[]>>
    setcurrentfolder_name: Dispatch<SetStateAction<string | undefined>>
}

function For_folders({
    currentfolder_name,
    mycall,
    mfolders,
    setmfiles,
    setmfolders,
    setcurrentfolder_name,
}: ForFoldersProps) {
    return (
        <div className="max-w-50 min-w-50   flex flex-col gap-3 bg-slate-950/60 p-4 rounded-sm">
            <label className="rounded-sm overflow-hidden bg-slate-800 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-300 border border-amber-900">
                {currentfolder_name ?? "root"}
            </label>

            <div className="rounded-none flex flex-col  ">
                <Button
                    onClick={() =>
                        mycall.handle_changeDir(
                            "..",
                            setmfiles,
                            setmfolders,
                            setcurrentfolder_name,
                        )
                    }
                    className={"rounded-none bg-slate-900 justify-start  "}
                >
                    <span>..</span>
                </Button>
            </div>

            <div className="rounded-none max-h-[calc(100vh-8rem)] min-h-0 flex-1 gap-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700/70 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full flex flex-col  ">
                {mfolders?.map((f, index) => (
                    <Button
                        key={index}
                        onClick={() =>
                            mycall.handle_changeDir(
                                f,
                                setmfiles,
                                setmfolders,
                                setcurrentfolder_name,
                            )
                        }
                        className={"rounded-none bg-slate-900 justify-start  "}
                    >
                        <Folder />
                        <span>{f}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default For_folders