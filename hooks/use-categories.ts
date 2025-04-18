"use client"

import { useState, useEffect } from "react"
import { fetchCategories } from "@/app/actions/api-actions"
import type { Category } from "@/lib/api"
import { API } from "@/constants"

export function useCategories(initialPage = 1) {
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const limit = API.LIMITS.DEFAULT

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true)
        const offset = (currentPage - 1) * limit
        console.log(`Fetching categories with limit: ${limit}, offset: ${offset}`)

        const response = await fetchCategories(limit, offset)
        console.log("Categories response:", response)

        if (response && response.results) {
          setCategories(response.results)
          setTotalPages(Math.ceil(response.page.size / limit) || 1)
        } else {
          console.error("Invalid API response format:", response)
          setError("カテゴリーの取得に失敗しました: 無効なレスポンス形式")
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
        setError("カテゴリーの取得に失敗しました")
      } finally {
        setIsLoading(false)
      }
    }

    getCategories()
  }, [currentPage, limit])

  useEffect(() => {
    if (searchQuery) {
      const filtered = categories.filter((category) =>
        category.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredCategories(filtered)
    } else {
      setFilteredCategories(categories)
    }
  }, [searchQuery, categories])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  // Group categories into subcategories if they have more than 10 phrases
  const groupCategories = (categories: Category[]) => {
    // This is a placeholder for the actual implementation
    // In a real app, you would fetch the phrase count for each category
    return categories.map((category, index) => {
      // For demonstration purposes, let's assume every third category has more than 10 phrases
      const hasSubcategories = index % 3 === 0
      return {
        ...category,
        hasSubcategories,
      }
    })
  }

  const displayCategories = groupCategories(filteredCategories)

  return {
    categories: displayCategories,
    isLoading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    handleSearchChange,
    handlePageChange,
  }
}
