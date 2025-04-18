"use client"

import { useState, useEffect } from "react"
import { getPhraseDetail, updateWord, createWord, type PhraseDetail, type Word } from "@/lib/api"
import { ERROR_MESSAGES } from "@/constants"

export function usePhraseDetail(categoryId: number, phraseId: number) {
  const [phraseDetail, setPhraseDetail] = useState<PhraseDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newWord, setNewWord] = useState("")
  const [newTranslate, setNewTranslate] = useState("")
  const [newWordType, setNewWordType] = useState("")
  const [isAddingWord, setIsAddingWord] = useState(false)
  const [searchResults, setSearchResults] = useState<Word[]>([])

  // 修正: データフェッチの改善
  useEffect(() => {
    const fetchPhraseDetail = async () => {
      try {
        setIsLoading(true)
        console.log(`Fetching phrase detail for categoryId: ${categoryId}, phraseId: ${phraseId}`)
        const detail = await getPhraseDetail(categoryId, phraseId)
        console.log("Fetched phrase detail:", detail)
        setPhraseDetail(detail)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching phrase detail:", err)
        setError(ERROR_MESSAGES.FETCH_PHRASE_DETAIL)
        setIsLoading(false)
      }
    }

    if (categoryId && phraseId) {
      fetchPhraseDetail()
    }
  }, [categoryId, phraseId])

  const handleFavoriteToggle = async (wordId: number, favorite: boolean) => {
    if (!phraseDetail) return

    try {
      const wordToUpdate = phraseDetail.word.find((w) => w.wordId === wordId)
      if (!wordToUpdate) return

      await updateWord(wordId, wordToUpdate.word, wordToUpdate.translate, wordToUpdate.wordType, favorite)

      // Update local state
      setPhraseDetail({
        ...phraseDetail,
        word: phraseDetail.word.map((w) => (w.wordId === wordId ? { ...w, favorite } : w)),
      })
    } catch (err) {
      console.error("Failed to update favorite status", err)
    }
  }

  const handleAddWord = async () => {
    if (!phraseDetail || !newWord || !newTranslate || !newWordType) return

    try {
      await createWord(newWord, newTranslate, newWordType, false)

      // In a real app, you would also attach this word to the phrase
      // For now, we'll just update the local state
      setPhraseDetail({
        ...phraseDetail,
        word: [
          ...phraseDetail.word,
          {
            wordId: Date.now(), // Temporary ID
            word: newWord,
            translate: newTranslate,
            wordType: newWordType,
            favorite: false,
          },
        ],
      })

      // Reset form
      setNewWord("")
      setNewTranslate("")
      setNewWordType("")
      setIsAddingWord(false)
    } catch (err) {
      console.error("Failed to add word", err)
    }
  }

  const handleSearchWord = (query: string) => {
    setSearchQuery(query)

    // In a real app, you would search the API for existing words
    // For now, we'll just filter the current words
    if (phraseDetail && query) {
      const results = phraseDetail.word.filter((w) => w.word.toLowerCase().includes(query.toLowerCase()))
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleSelectExistingWord = (word: Word) => {
    // In a real app, you would attach this word to the phrase
    // For now, we'll just update the local state
    if (!phraseDetail) return

    // Check if word is already attached
    const isAlreadyAttached = phraseDetail.word.some((w) => w.wordId === word.wordId)
    if (isAlreadyAttached) return

    setPhraseDetail({
      ...phraseDetail,
      word: [...phraseDetail.word, word],
    })

    setSearchQuery("")
    setSearchResults([])
  }

  return {
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
  }
}
