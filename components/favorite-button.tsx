"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"

interface FavoriteButtonProps {
  initialFavorite: boolean
  onToggle: (favorite: boolean) => void
}

export function FavoriteButton({ initialFavorite, onToggle }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(initialFavorite)

  const handleToggle = () => {
    const newValue = !favorite
    setFavorite(newValue)
    onToggle(newValue)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
    </Button>
  )
}
