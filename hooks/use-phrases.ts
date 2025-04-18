"use client"

import { useState, useEffect } from "react"
import { fetchPhrases } from "@/app/actions/api-actions"
import type { Phrase } from "@/lib/api"
import { API } from "@/constants"

export function usePhrases(initialPage = 1) {
  const [phrases, setPhrases] = useState<Phrase[]>([])
  const [filteredPhrases, setFilteredPhrases] = useState<Phrase[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const limit = API.LIMITS.DEFAULT

  useEffect(() => {
    const getPhrases = async () => {
      try {
        setIsLoading(true)
        const offset = (currentPage - 1) * limit
        console.log(`Fetching phrases with limit: ${limit}, offset: ${offset}`)

        const response = await fetchPhrases(limit, offset)
        console.log("Phrases response:", response)

        if (response && response.results) {
          setPhrases(response.results)
          setTotalPages(Math.ceil(response.page.size / limit) || 1)
        } else {
          console.error("Invalid API response format:", response)
          setError("フレーズの取得に失敗しました: 無効なレスポンス形式")
        }
      } catch (err) {
        console.error("Error fetching phrases:", err)
        setError("フレーズの取得に失敗しました")
      } finally {
        setIsLoading(false)
      }
    }

    getPhrases()
  }, [currentPage, limit])

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
