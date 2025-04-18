"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

interface SearchProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function Search({ placeholder, value, onChange }: SearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full pl-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
