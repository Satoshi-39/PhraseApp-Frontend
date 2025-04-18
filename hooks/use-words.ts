"use client"

import { useState, useEffect } from "react"
import { getWords, updateWord, type Word } from "@/lib/api"
import { API } from "@/constants"

export function useWords(initialPage = 1) {
  const [words, setWords] = useState<Word[]>([])
  const [filteredWords, setFilteredWords] = useState<Word[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const limit = API.LIMITS.DEFAULT

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setIsLoading(true)
        const offset = (currentPage - 1) * limit
        console.log(`Fetching words with limit: ${limit}, offset: ${offset}`)
        const response = await getWords(limit, offset)
        console.log("Words response:", response)

        if (response && response.results) {
          setWords(response.results)
          setTotalPages(Math.ceil(response.page.size / limit) || 1)
        } else {
          // APIからのレスポンスが期待通りでない場合
          console.error("Invalid API response format:", response)
          setError("単語の取得に失敗しました: 無効なレスポンス形式")
        }
      } catch (err) {
        console.error("Error fetching words:", err)
        setError("単語の取得に失敗しました")
      } finally {
        setIsLoading(false)
      }
    }

    fetchWords()
  }, [currentPage, limit])

  useEffect(() => {
    if (searchQuery) {
      const filtered = words.filter(
        (word) =>
          word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
          word.translate.toLowerCase().includes(searchQuery.toLowerCase()) ||
          word.wordType.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredWords(filtered)
    } else {
      setFilteredWords(words)
    }
  }, [searchQuery, words])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  const handleFavoriteToggle = async (wordId: number, favorite: boolean) => {
    try {
      const wordToUpdate = words.find((w) => w.wordId === wordId)
      if (!wordToUpdate) return

      await updateWord(wordId, wordToUpdate.word, wordToUpdate.translate, wordToUpdate.wordType, favorite)

      // Update local state
      setWords(words.map((w) => (w.wordId === wordId ? { ...w, favorite } : w)))
    } catch (err) {
      console.error("Failed to update favorite status", err)
    }
  }

  return {
    words: filteredWords,
    isLoading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    handleSearchChange,
    handlePageChange,
    handleFavoriteToggle,
  }
}
