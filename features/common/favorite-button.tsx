"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"
import { updateFavorite } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import { ERROR_MESSAGES } from "@/constants"

interface FavoriteButtonProps {
  wordId: number
  initialFavorite: boolean
  onToggle?: (favorite: boolean) => void
}

export function FavoriteButton({ wordId, initialFavorite, onToggle }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(initialFavorite)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleToggle = async () => {
    if (isUpdating) return

    const newValue = !favorite
    setIsUpdating(true)

    try {
      // APIを呼び出してデータベースを更新
      await updateFavorite(wordId, newValue)

      // 状態を更新
      setFavorite(newValue)
      if (onToggle) {
        onToggle(newValue)
      }

      // 成功メッセージ
      toast({
        title: newValue ? "お気に入りに追加しました" : "お気に入りから削除しました",
        variant: "default",
      })
    } catch (error) {
      console.error("Failed to update favorite:", error)

      // エラーメッセージ
      toast({
        title: ERROR_MESSAGES.UPDATE_FAVORITE,
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      disabled={isUpdating}
      aria-label={favorite ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <Heart className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
    </Button>
  )
}
