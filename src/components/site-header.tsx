import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {  Sun, Moon } from "lucide-react"

interface TopbarProps {
  onToggle: () => void
  lightMode: boolean
}


export function SiteHeader({lightMode,onToggle}:TopbarProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-foreground font-medium">Note App</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggle}>
            {!lightMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-black" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
