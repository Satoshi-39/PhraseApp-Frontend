"use client"

import { useState, useEffect } from "react"
import { getPhrasesByCategory, getCategory, type Phrase, type Category } from "@/lib/api"
import { API } from "@/constants"

export function usePhrasesByCategory(categoryId: number, range: string | null, initialPage = 1) {
  const [category, setCategory] = useState<Category | null>(null)
  const [phrases, setPhrases] = useState<Phrase[]>([])
  const [filteredPhrases, setFilteredPhrases] = useState<Phrase[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const limit = API.LIMITS.DEFAULT

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory(categoryId)
        setCategory(categoryData)
      } catch (err) {
        setError("カテゴリーの取得に失敗しました")
      }
    }

    fetchCategory()
  }, [categoryId])

  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        setIsLoading(true)
        const offset = (currentPage - 1) * limit
        const response = await getPhrasesByCategory(categoryId, limit, offset)

        // Filter phrases based on range if provided
        let filteredResults = response.results
        if (range) {
          const [start, end] = range.split("-").map(Number)
          filteredResults = response.results.filter((_, index) => {
            const phraseNumber = index + 1 + offset
            return phraseNumber >= start && phraseNumber <= end
          })
        }

        setPhrases(filteredResults)
        setTotalPages(Math.ceil(response.page.size / limit) || 1)
        setIsLoading(false)
      } catch (err) {
        setError("フレーズの取得に失敗しました")
        setIsLoading(false)
      }
    }

    fetchPhrases()
  }, [categoryId, currentPage, range, limit])

  useEffect(() => {
    if (searchQuery) {
      const filtered = phrases.filter(
        (phrase) =>
          phrase.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
          phrase.translate.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredPhrases(filtered)
    } else {
      setFilteredPhrases(phrases)
    }
  }, [searchQuery, phrases])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  return {
    category,
    phrases: filteredPhrases,
    isLoading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    handleSearchChange,
    handlePageChange,
  }
}
