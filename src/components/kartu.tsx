import { useState,useRef,useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface KartuProps {
    id : string;
  title: string;
  note: string;
  color: string;
  date: string;
}

export function Kartu({ id,title, note, color, date }: KartuProps) {

  return (
  <Card className={`${color} w-64 min-h-48 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200`}>
    <CardHeader className="pb-2">
      <CardTitle className="text-black font-semibold truncate">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-black/80">
      {note}
    </CardContent>
    <CardFooter className="pt-2 text-xs text-black/60 justify-end">
      {new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })}
    </CardFooter>
  </Card>
)
}