"use client"

import { useState, useEffect, useRef } from "react"
import { Archive, Home, NotepadText, Search, Settings } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Create Note",
    url: "#",
    icon: NotepadText,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Archive",
    url: "#",
    icon: Archive,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const colorOptions = [
  { color: "bg-red-400" },
  { color: "bg-blue-400" },
  { color: "bg-green-300" },
  { color: "bg-yellow-300" },
  { color: "bg-indigo-400" },
  { color: "bg-violet-300" },
  { color: "bg-teal-300" },
  { color: "bg-fuchsia-300" }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [searchActive, setSearchActive] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchActive &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSearchActive(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [searchActive])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearchActive(false)
    }
  }
  
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.icon === NotepadText ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton asChild>
                          <button className="flex items-center gap-2 w-full">
                            <item.icon />
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="start" className="w-40 grid grid-cols-4 grid-rows-3 gap-1">
                        <DropdownMenuLabel className="col-span-4">Pilih Warna</DropdownMenuLabel>
                        {colorOptions.map((colorItem) => (
                          <DropdownMenuItem
                            key={colorItem.color}
                            className="items-center gap-2 cursor-pointer w-fit"
                          >
                            <span
                              className={`w-4 h-4 rounded-full ${colorItem.color}`}
                            />
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : item.icon === Search ? (
                    <div ref={containerRef}>
                      {searchActive ? (
                        <InputGroup>
                          <InputGroupInput
                            placeholder="Search..."
                            ref={searchRef}
                            onKeyDown={handleKeyDown}
                            autoFocus
                          />
                          <InputGroupAddon>
                            <Search />
                          </InputGroupAddon>
                        </InputGroup>
                      ) : (
                        <SidebarMenuButton asChild>
                          <button
                            className="flex items-center gap-2 w-full"
                            onClick={() => setSearchActive(true)}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      )}
                    </div>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-2 w-full"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}