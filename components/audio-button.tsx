"use client"

import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import { useState } from "react"

interface AudioButtonProps {
  text: string
  lang?: string
}

export function AudioButton({ text, lang = "en-US" }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const speak = () => {
    if ("speechSynthesis" in window) {
      setIsPlaying(true)

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang

      utterance.onend = () => {
        setIsPlaying(false)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={speak} disabled={isPlaying} aria-label="Listen to pronunciation">
      <Volume2 className={`h-5 w-5 ${isPlaying ? "text-primary" : "text-muted-foreground"}`} />
    </Button>
  )
}
