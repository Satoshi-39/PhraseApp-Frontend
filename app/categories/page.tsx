"use client"

import { Header } from "@/features/layout/header"
import { Search } from "@/features/common/search"
import { Pagination } from "@/features/common/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useCategories } from "@/hooks/use-categories"
import { TEXT } from "@/constants"
import { useEffect } from "react"

export default function CategoriesPage() {
  const {
    categories: displayCategories,
    isLoading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    handleSearchChange,
    handlePageChange,
  } = useCategories()

  // デバッグ情報をコンソールに出力
  useEffect(() => {
    console.log("Categories page state:", {
      displayCategories,
      isLoading,
      error,
      currentPage,
      totalPages,
    })
  }, [displayCategories, isLoading, error, currentPage, totalPages])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">{TEXT.CATEGORIES.TITLE}</h1>
            <Search
              placeholder={TEXT.CATEGORIES.SEARCH_PLACEHOLDER}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <p>{TEXT.CATEGORIES.LOADING}</p>
            </div>
          ) : error ? (
            <div className="flex justify-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayCategories.map((category) => (
                  <Card key={category.categoryId}>
                    <CardHeader>
                      <CardTitle>{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {category.hasSubcategories ? (
                        <div className="space-y-2">
                          <Link
                            href={`/phrases/${category.categoryId}?range=1-10`}
                            className="block p-2 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
                          >
                            {TEXT.CATEGORIES.PHRASES_RANGE_1}
                          </Link>
                          <Link
                            href={`/phrases/${category.categoryId}?range=11-20`}
                            className="block p-2 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
                          >
                            {TEXT.CATEGORIES.PHRASES_RANGE_2}
                          </Link>
                        </div>
                      ) : (
                        <Link
                          href={`/phrases/${category.categoryId}`}
                          className="block p-2 bg-primary rounded-md hover:bg-primary/80 transition-colors"
                        >
                          {TEXT.COMMON.VIEW_PHRASES}
                        </Link>
                      )}
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
