"use client"

import { useState, useEffect, useRef } from "react"
import { Archive, Home, NotepadText, Search, Settings } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { it } from "node:test"

// Menu items.
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
    title: "Archieve",
    url: "#",
    icon: Archive,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
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
    <Sidebar {...props} ref={containerRef}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.icon === Search ? (
                    searchActive ? (
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
                    )
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