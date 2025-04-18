"use client"

import { Header } from "@/features/layout/header"
import { Search } from "@/features/common/search"
import { Pagination } from "@/features/common/pagination"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FavoriteButton } from "@/features/common/favorite-button"
import { AudioButton } from "@/features/common/audio-button"
import { useWords } from "@/hooks/use-words"
import { TEXT } from "@/constants"
import { useEffect } from "react"

export default function WordsPage() {
  const {
    words: filteredWords,
    isLoading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    handleSearchChange,
    handlePageChange,
    handleFavoriteToggle,
  } = useWords()

  // デバッグ情報をコンソールに出力
  useEffect(() => {
    console.log("Words page state:", {
      filteredWords,
      isLoading,
      error,
      currentPage,
      totalPages,
    })
  }, [filteredWords, isLoading, error, currentPage, totalPages])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">{TEXT.WORDS.TITLE}</h1>
            <Search placeholder={TEXT.WORDS.SEARCH_PLACEHOLDER} value={searchQuery} onChange={handleSearchChange} />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <p>{TEXT.WORDS.LOADING}</p>
            </div>
          ) : error ? (
            <div className="flex justify-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWords.map((word) => (
                  <Card key={word.wordId}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{word.wordType}</Badge>
                        <div className="flex items-center gap-2">
                          <FavoriteButton
                            wordId={word.wordId}
                            initialFavorite={word.favorite}
                            onToggle={(favorite) => handleFavoriteToggle(word.wordId, favorite)}
                          />
                          <AudioButton text={word.word} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">{word.word}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-muted-foreground">{word.translate}</p>
                          <AudioButton text={word.translate} lang="ja-JP" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
