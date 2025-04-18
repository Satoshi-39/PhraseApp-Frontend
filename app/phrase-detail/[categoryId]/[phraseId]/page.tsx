"use client"

import { useParams, useRouter } from "next/navigation"
import { Header } from "@/features/layout/header"
import { Search } from "@/features/common/search"
import { Collapsible } from "@/features/common/collapsible"
import { FavoriteButton } from "@/features/common/favorite-button"
import { AudioButton } from "@/features/common/audio-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { usePhraseDetail } from "@/hooks/use-phrase-detail"
import { TEXT } from "@/constants"

export default function PhraseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = Number(params.categoryId)
  const phraseId = Number(params.phraseId)

  const {
    phraseDetail,
    isLoading,
    error,
    searchQuery,
    newWord,
    newTranslate,
    newWordType,
    isAddingWord,
    searchResults,
    setNewWord,
    setNewTranslate,
    setNewWordType,
    setIsAddingWord,
    handleFavoriteToggle,
    handleAddWord,
    handleSearchWord,
    handleSelectExistingWord,
  } = usePhraseDetail(categoryId, phraseId)

  const navigateToNextPhrase = () => {
    router.push(`/phrase-detail/${categoryId}/${phraseId + 1}`)
  }

  const navigateToPreviousPhrase = () => {
    if (phraseId > 1) {
      router.push(`/phrase-detail/${categoryId}/${phraseId - 1}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{TEXT.PHRASE_DETAIL.TITLE}</h1>
              {phraseDetail && <p className="text-muted-foreground">{phraseDetail.category}</p>}
            </div>
            <Search
              placeholder={TEXT.PHRASE_DETAIL.SEARCH_PLACEHOLDER}
              value={searchQuery}
              onChange={handleSearchWord}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <p>{TEXT.PHRASE_DETAIL.LOADING}</p>
            </div>
          ) : error ? (
            <div className="flex justify-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : phraseDetail ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{phraseDetail.phrase}</CardTitle>
                    <div className="flex items-center gap-2">
                      <FavoriteButton wordId={0} initialFavorite={false} />
                      <AudioButton text={phraseDetail.phrase} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Collapsible title={TEXT.PHRASE_DETAIL.TRANSLATION} defaultOpen={false}>
                    <div className="flex justify-between items-center">
                      <p>{phraseDetail.translate}</p>
                      <AudioButton text={phraseDetail.translate} lang="ja-JP" />
                    </div>
                  </Collapsible>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{TEXT.PHRASE_DETAIL.WORDS_TITLE}</h2>

                <div className="space-y-4">
                  {/* All words collapsible */}
                  <Collapsible title={TEXT.PHRASE_DETAIL.ALL_WORDS} defaultOpen={false}>
                    <div className="space-y-2">
                      {phraseDetail.word.map((word) => (
                        <Card key={word.wordId}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <Badge variant="outline">{word.wordType}</Badge>
                                <p className="font-medium mt-1">{word.word}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <FavoriteButton
                                  wordId={word.wordId}
                                  initialFavorite={word.favorite}
                                  onToggle={(favorite) => handleFavoriteToggle(word.wordId, favorite)}
                                />
                                <AudioButton text={word.word} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </Collapsible>

                  {/* Individual words collapsibles */}
                  {phraseDetail.word.map((word) => (
                    <Collapsible
                      key={word.wordId}
                      title={
                        <div className="flex items-center gap-2">
                          <span>{word.word}</span>
                          <Badge variant="outline">{word.wordType}</Badge>
                        </div>
                      }
                      defaultOpen={false}
                    >
                      <div className="flex justify-between items-center">
                        <p>{word.translate}</p>
                        <div className="flex items-center gap-2">
                          <FavoriteButton
                            wordId={word.wordId}
                            initialFavorite={word.favorite}
                            onToggle={(favorite) => handleFavoriteToggle(word.wordId, favorite)}
                          />
                          <AudioButton text={word.word} />
                          <AudioButton text={word.translate} lang="ja-JP" />
                        </div>
                      </div>
                    </Collapsible>
                  ))}
                </div>

                {/* Add word section */}
                <div className="mt-6">
                  {isAddingWord ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{TEXT.PHRASE_DETAIL.NEW_WORD}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="word" className="block text-sm font-medium mb-1">
                              {TEXT.PHRASE_DETAIL.WORD_LABEL}
                            </label>
                            <Input
                              id="word"
                              value={newWord}
                              onChange={(e) => setNewWord(e.target.value)}
                              placeholder={TEXT.PHRASE_DETAIL.WORD_PLACEHOLDER}
                            />
                          </div>
                          <div>
                            <label htmlFor="translate" className="block text-sm font-medium mb-1">
                              {TEXT.PHRASE_DETAIL.TRANSLATION_LABEL}
                            </label>
                            <Input
                              id="translate"
                              value={newTranslate}
                              onChange={(e) => setNewTranslate(e.target.value)}
                              placeholder={TEXT.PHRASE_DETAIL.TRANSLATION_PLACEHOLDER}
                            />
                          </div>
                          <div>
                            <label htmlFor="wordType" className="block text-sm font-medium mb-1">
                              {TEXT.PHRASE_DETAIL.WORD_TYPE_LABEL}
                            </label>
                            <Input
                              id="wordType"
                              value={newWordType}
                              onChange={(e) => setNewWordType(e.target.value)}
                              placeholder={TEXT.PHRASE_DETAIL.WORD_TYPE_PLACEHOLDER}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleAddWord} disabled={!newWord || !newTranslate || !newWordType}>
                              {TEXT.PHRASE_DETAIL.ADD_WORD}
                            </Button>
                            <Button variant="outline" onClick={() => setIsAddingWord(false)}>
                              {TEXT.COMMON.CANCEL}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={() => setIsAddingWord(true)} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        {TEXT.PHRASE_DETAIL.ADD_WORD}
                      </Button>

                      {searchResults.length > 0 && (
                        <div className="absolute mt-10 bg-background border rounded-md shadow-md z-10 w-64">
                          <div className="p-2 border-b">
                            <p className="font-medium">{TEXT.PHRASE_DETAIL.EXISTING_WORDS}</p>
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {searchResults.map((word) => (
                              <div
                                key={word.wordId}
                                className="p-2 hover:bg-secondary cursor-pointer"
                                onClick={() => handleSelectExistingWord(word)}
                              >
                                <p className="font-medium">{word.word}</p>
                                <p className="text-sm text-muted-foreground">{word.translate}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={navigateToPreviousPhrase}
                  disabled={phraseId <= 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {TEXT.PHRASE_DETAIL.PREVIOUS_PHRASE}
                </Button>
                <Button onClick={navigateToNextPhrase} className="flex items-center gap-2">
                  {TEXT.PHRASE_DETAIL.NEXT_PHRASE}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}
