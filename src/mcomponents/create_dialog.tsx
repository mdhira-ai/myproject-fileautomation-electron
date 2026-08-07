import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { useRef } from "react";

interface CreateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function CreateDialog({ open, onOpenChange }: CreateDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>

                </DialogHeader>
                <MyInput onOpenChange={onOpenChange} />
            </DialogContent>
        </Dialog>
    );
}

export default CreateDialog;

interface MyInputProps {
    onOpenChange: (open: boolean) => void;
}

export function MyInput({ onOpenChange }: MyInputProps) {
    const filename = useRef<HTMLInputElement | null>(null);

    function createfile() {
        console.log(filename.current?.value);
        onOpenChange(false);
    }

    return (
        <Field>
            <FieldLabel htmlFor="input-file-name">File Name</FieldLabel>
            <Input ref={filename} type="text" placeholder="Enter file name" />
            <FieldDescription>
                <Button onClick={createfile}>Create</Button>
            </FieldDescription>
        </Field>
    );
}
