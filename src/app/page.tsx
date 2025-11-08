"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Kartu } from "@/components/kartu"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  const [lightMode, setLightMode] = useState(true)
  useEffect(() => {
    if (lightMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [lightMode])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader lightMode={lightMode} onToggle={() => setLightMode(!lightMode)} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 px-2 sm:px-4 lg:px-6">
                  <Kartu id="1" title="Catatan Awal" note="Notess" color="bg-red-400" date={new Date().toString()} />
                  <Kartu id="2" title="Belajar React" note="Pelajari useEffect dan state management" color="bg-blue-400" date={new Date().toString()} />
                  <Kartu id="3" title="Rencana Minggu Ini" note="Benerin IoT project dan commit ke GitHub" color="bg-green-400" date={new Date().toString()} />
                  <Kartu id="4" title="Tugas Kampus" note="Laporan data preprocessing harus dikumpul Jumat" color="bg-yellow-400" date={new Date().toString()} />
                  <Kartu id="5" title="Ide Project" note="Catatan app pakai Next.js + Supabase" color="bg-purple-400" date={new Date().toString()} />
                  <Kartu id="6" title="Reminder" note="Jangan lupa push branch baru" color="bg-orange-400" date={new Date().toString()} />
                  <Kartu id="7" title="Latihan Koding" note="Buat form dengan useRef dan handleSubmit" color="bg-pink-400" date={new Date().toString()} />
                  <Kartu id="8" title="Eksperimen" note="Tes API public buat fetch data ke frontend" color="bg-teal-400" date={new Date().toString()} />
                  <Kartu id="9" title="Notes Random" note="Coba gaya layout grid untuk cards" color="bg-lime-400" date={new Date().toString()} />
                  <Kartu id="10" title="Daily Log" note="Belajar destructuring props dan component reuse" color="bg-cyan-400" date={new Date().toString()} />
                </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}