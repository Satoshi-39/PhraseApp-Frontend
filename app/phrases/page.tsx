"use client"

import { Header } from "@/features/layout/header"
import { Search } from "@/features/common/search"
import { Pagination } from "@/features/common/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { usePhrases } from "@/hooks/use-phrases"
import { TEXT } from "@/constants"
import { useEffect } from "react"

export default function PhrasesPage() {
  const {
    phrases: filteredPhrases,
    isLoading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    handleSearchChange,
    handlePageChange,
  } = usePhrases()

  // デバッグ情報をコンソールに出力
  useEffect(() => {
    console.log("Phrases page state:", {
      filteredPhrases,
      isLoading,
      error,
      currentPage,
      totalPages,
    })
  }, [filteredPhrases, isLoading, error, currentPage, totalPages])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">{TEXT.PHRASES.TITLE}</h1>
            <Search placeholder={TEXT.PHRASES.SEARCH_PLACEHOLDER} value={searchQuery} onChange={handleSearchChange} />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <p>{TEXT.PHRASES.LOADING}</p>
            </div>
          ) : error ? (
            <div className="flex justify-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPhrases.map((phrase) => (
                  <Card key={phrase.phraseId}>
                    <CardHeader>
                      <CardTitle className="text-lg">{phrase.phrase}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{phrase.translate}</p>
                      <Link
                        href={`/phraseDetail?categoryId=1&phraseId=${phrase.phraseId}`}
                        className="inline-block px-4 py-2 bg-primary rounded-md hover:bg-primary/80 transition-colors"
                      >
                        {TEXT.COMMON.VIEW_DETAILS}
                      </Link>
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
