"use server"

import { API, ERROR_MESSAGES } from "@/constants"
import type { Category, Phrase, PhraseDetail, Word, PaginatedResponse } from "@/lib/api"

// カテゴリー取得のサーバーアクション
export async function fetchCategories(limit = 20, offset = 0): Promise<PaginatedResponse<Category>> {
  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}?limit=${limit}&offset=${offset}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
      next: { revalidate: 60 }, // 60秒間キャッシュ
    })

    if (!response.ok) {
      throw new Error(`${ERROR_MESSAGES.FETCH_CATEGORIES} (${response.status})`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in fetchCategories:", error)
    throw error
  }
}

// カテゴリー詳細取得のサーバーアクション
export async function fetchCategory(categoryId: number): Promise<Category> {
  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}/${categoryId}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`${ERROR_MESSAGES.FETCH_CATEGORIES} (${response.status})`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in fetchCategory:", error)
    throw error
  }
}

// フレーズ取得のサーバーアクション
export async function fetchPhrases(limit = 20, offset = 0): Promise<PaginatedResponse<Phrase>> {
  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PHRASES}?limit=${limit}&offset=${offset}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`${ERROR_MESSAGES.FETCH_PHRASES} (${response.status})`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in fetchPhrases:", error)
    throw error
  }
}

// カテゴリー別フレーズ取得のサーバーアクション
export async function fetchPhrasesByCategory(
  categoryId: number,
  limit = 20,
  offset = 0,
): Promise<PaginatedResponse<Phrase>> {
  try {
    const response = await fetch(
      `${API.BASE_URL}${API.ENDPOINTS.PHRASES}/${categoryId}/?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        next: { revalidate: 60 },
      },
    )

    if (!response.ok) {
      throw new Error(`${ERROR_MESSAGES.FETCH_PHRASES} (${response.status})`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in fetchPhrasesByCategory:", error)
    throw error
  }
}

// フレーズ詳細取得のサーバーアクション
export async function fetchPhraseDetail(categoryId: number, phraseId: number): Promise<PhraseDetail> {
  try {
    const response = await fetch(
      `${API.BASE_URL}${API.ENDPOINTS.PHRASE_DETAIL}?categoryId=${categoryId}&phraseId=${phraseId}`,
      {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        next: { revalidate: 60 },
      },
    )

    if (!response.ok) {
      throw new Error(`${ERROR_MESSAGES.FETCH_PHRASE_DETAIL} (${response.status})`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in fetchPhraseDetail:", error)
    throw error
  }
}

// 単語取得のサーバーアクション
export async function fetchWords(limit = 20, offset = 0): Promise<PaginatedResponse<Word>> {
  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.WORDS}?limit=${limit}&offset=${offset}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`${ERROR_MESSAGES.FETCH_WORDS} (${response.status})`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in fetchWords:", error)
    throw error
  }
}

// お気に入り更新のサーバーアクション
export async function updateWordFavorite(wordId: number, favorite: boolean): Promise<Word> {
  try {
    // まず単語の現在の情報を取得
    const wordResponse = await fetch(`${API.BASE_URL}${API.ENDPOINTS.WORDS}/${wordId}`)

    if (!wordResponse.ok) {
      throw new Error(ERROR_MESSAGES.FETCH_WORDS)
    }

    const word: Word = await wordResponse.json()

    // お気に入り状態を更新
    const updateResponse = await fetch(`${API.BASE_URL}${API.ENDPOINTS.WORDS}/${wordId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: word.word,
        translate: word.translate,
        wordType: word.wordType,
        favorite,
      }),
    })

    if (!updateResponse.ok) {
      throw new Error(ERROR_MESSAGES.UPDATE_FAVORITE)
    }

    return await updateResponse.json()
  } catch (error) {
    console.error("Error in updateWordFavorite:", error)
    throw error
  }
}
