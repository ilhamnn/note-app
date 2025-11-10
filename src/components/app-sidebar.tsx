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

const items: Array<{ title: string; value: TabType; icon: any }> = [
  { title: "Home", value: "home", icon: Home },
  { title: "Create Note", value: "create", icon: NotepadText },
  { title: "Search", value: "search", icon: Search },
  { title: "Archive", value: "archive", icon: Archive },
]

const colorOptions = [
  { name: "Red", color: "bg-red-400" },
  { name: "Blue", color: "bg-blue-400" },
  { name: "Green", color: "bg-green-300" },
  { name: "Yellow", color: "bg-yellow-300" },
  { name: "Indigo", color: "bg-indigo-400" },
  { name: "Violet", color: "bg-violet-300" },
  { name: "Teal", color: "bg-teal-300" },
  { name: "Fuchsia", color: "bg-fuchsia-300" },
]

type TabType = "home" | "create" | "search" | "archive" 

type SidebarProps = {
  onTab: TabType
  onTabChange: (tab: TabType) => void
  onColorChange?: (color: string) => void
  onSearch?: (query: string) => void
  variant?: "sidebar" | "floating" | "inset"
}

export function AppSidebar({ 
  variant, 
  onTab, 
  onTabChange, 
  onColorChange, 
  onSearch 
}: SidebarProps) {
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
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

  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (onSearch && searchQuery.trim()) {
        onSearch(searchQuery)
      }
      setSearchActive(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleColorSelect = (color: string) => {
    if (onColorChange) {
      onColorChange(color)
    }
  }

  return (
    <Sidebar variant={variant}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.value}>
                  {/* Search dengan Input */}
                  {item.icon === Search ? (
                    <div ref={containerRef}>
                      {searchActive ? (
                        <InputGroup>
                          <InputGroupInput
                            placeholder="Search notes..."
                            ref={searchRef}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchSubmit}
                            autoFocus
                          />
                          <InputGroupAddon>
                            <Search className="w-4 h-4" />
                          </InputGroupAddon>
                        </InputGroup>
                      ) : (
                        <SidebarMenuButton asChild>
                          <button
                            className={`flex items-center gap-2 w-full ${
                              onTab === item.value ? "bg-muted" : ""
                            }`}
                            onClick={() => {
                              setSearchActive(true)
                              onTabChange(item.value)
                            }}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      )}
                    </div>
                  ) : (
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => onTabChange(item.value)}
                        className={`flex items-center gap-2 w-full ${
                          onTab === item.value ? "bg-muted" : ""
                        }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
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