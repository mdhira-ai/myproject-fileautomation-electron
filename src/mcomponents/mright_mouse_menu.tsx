import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"


function mright_mouse_menu() {
    return (
        <ContextMenu>
            <ContextMenuTrigger>Right click here</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Profile</ContextMenuItem>
                <ContextMenuItem>Billing</ContextMenuItem>
                <ContextMenuItem>Team</ContextMenuItem>
                <ContextMenuItem>Subscription</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default mright_mouse_menu