"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/tools/hero/hero"
import { CreateTab } from "@/tools/add note/create-tab"
import { SearchTab } from "@/tools/search/search"
import { ArchiveTab } from "@/tools/archive/achive"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getNotes, getArchivedNotes, Note } from "@/lib/notes-api"

type TabType = "home" | "create" | "search" | "archive" 

export default function Page() {
  const [lightMode, setLightMode] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("home")
  const [selectedColor, setSelectedColor] = useState("bg-yellow-300")
  const [searchQuery, setSearchQuery] = useState("")
  
  // State untuk notes
  const [notes, setNotes] = useState<Note[]>([])
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (lightMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [lightMode])

  // Fetch notes saat component mount
  useEffect(() => {
    fetchNotes()
    fetchArchivedNotes()
  }, [])

  const fetchNotes = async () => {
    setIsLoading(true)
    try {
      const data = await getNotes()
      setNotes(data)
    } catch (error) {
      console.error("Failed to fetch notes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchArchivedNotes = async () => {
    try {
      const data = await getArchivedNotes()
      setArchivedNotes(data)
    } catch (error) {
      console.error("Failed to fetch archived notes:", error)
    }
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

 const renderContent = () => {
  switch (activeTab) {
    case "home":
      return <Hero notes={notes} isLoading={isLoading} onRefresh={fetchNotes} onNavigateToCreate={() => setActiveTab("create")}/>
    case "create":
      return (
         <CreateTab 
          selectedColor={selectedColor} 
          onColorChange={handleColorChange}
          onNoteCreated={fetchNotes}
          onNavigateHome={() => setActiveTab("home")} // ← Tambah ini
        />
      )
    case "search":
      return <SearchTab query={searchQuery} notes={notes} />
    case "archive":
      return (
        <ArchiveTab 
          archivedNotes={archivedNotes}
          onRefresh={() => {
            fetchNotes()
            fetchArchivedNotes()
          }}
        />
      )
    default:
      return <Hero notes={notes} isLoading={isLoading} onRefresh={fetchNotes} />
  }
}

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar 
        variant="inset" 
        onTab={activeTab} 
        onTabChange={setActiveTab}
        onColorChange={handleColorChange}
        onSearch={handleSearch}
      />
      
      <SidebarInset>
        <SiteHeader 
          lightMode={lightMode} 
          onToggle={() => setLightMode(!lightMode)} 
        />
        
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="gap-x-2 gap-y-4 px-2 sm:px-4 lg:px-6">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}