import { API, ERROR_MESSAGES } from "@/constants"

// Types
export interface Category {
  categoryId: number
  category: string
  created_at?: string
  updated_at?: string
}

export interface Phrase {
  phraseId: number
  phrase: string
  translate: string
}

export interface Word {
  wordId: number
  word: string
  translate: string
  favorite: boolean
  wordType: string
}

export interface PhraseDetail {
  categoryId: number
  category: string
  phraseId: number
  phrase: string
  translate: string
  word: Word[]
}

export interface PaginatedResponse<T> {
  page: {
    limit: number
    offset: number
    size: number
  }
  results: T[]
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
}

// API Functions
export async function getCategories(limit = API.LIMITS.DEFAULT, offset = 0): Promise<PaginatedResponse<Category>> {
  console.log(`API call: ${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}?limit=${limit}&offset=${offset}`)

  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}?limit=${limit}&offset=${offset}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}): ${errorText}`)
      throw new Error(`${ERROR_MESSAGES.FETCH_CATEGORIES} (${response.status})`)
    }

    const data = await response.json()
    console.log("API response data:", data)
    return data
  } catch (error) {
    console.error("Error in getCategories:", error)
    throw error
  }
}

export async function getCategory(categoryId: number): Promise<Category> {
  console.log(`API call: ${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}/${categoryId}`)

  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}/${categoryId}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}): ${errorText}`)
      throw new Error(`${ERROR_MESSAGES.FETCH_CATEGORIES} (${response.status})`)
    }

    const data = await response.json()
    console.log("API response data:", data)
    return data
  } catch (error) {
    console.error("Error in getCategory:", error)
    throw error
  }
}

export async function createCategory(category: string): Promise<void> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  })
  if (!response.ok) {
    throw new Error("Failed to create category")
  }
}

export async function updateCategory(categoryId: number, category: string): Promise<Category> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  })
  if (!response.ok) {
    throw new Error("Failed to update category")
  }
  return response.json()
}

export async function deleteCategory(categoryId: number): Promise<void> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}/${categoryId}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete category")
  }
}

export async function getPhrases(limit = API.LIMITS.DEFAULT, offset = 0): Promise<PaginatedResponse<Phrase>> {
  console.log(`API call: ${API.BASE_URL}${API.ENDPOINTS.PHRASES}?limit=${limit}&offset=${offset}`)

  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PHRASES}?limit=${limit}&offset=${offset}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}): ${errorText}`)
      throw new Error(`${ERROR_MESSAGES.FETCH_PHRASES} (${response.status})`)
    }

    const data = await response.json()
    console.log("API response data:", data)
    return data
  } catch (error) {
    console.error("Error in getPhrases:", error)
    throw error
  }
}

export async function getPhrasesByCategory(
  categoryId: number,
  limit = API.LIMITS.DEFAULT,
  offset = 0,
): Promise<PaginatedResponse<Phrase>> {
  console.log(`API call: ${API.BASE_URL}${API.ENDPOINTS.PHRASES}/${categoryId}/?limit=${limit}&offset=${offset}`)

  try {
    const response = await fetch(
      `${API.BASE_URL}${API.ENDPOINTS.PHRASES}/${categoryId}/?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}): ${errorText}`)
      throw new Error(`${ERROR_MESSAGES.FETCH_PHRASES} (${response.status})`)
    }

    const data = await response.json()
    console.log("API response data:", data)
    return data
  } catch (error) {
    console.error("Error in getPhrasesByCategory:", error)
    throw error
  }
}

export async function getPhrase(phraseId: number): Promise<Phrase> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PHRASES}/${phraseId}`)
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_PHRASES)
  }
  return response.json()
}

export async function createPhrase(phrase: string, translate: string): Promise<void> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PHRASES}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phrase, translate }),
  })
  if (!response.ok) {
    throw new Error("Failed to create phrase")
  }
}

export async function updatePhrase(phraseId: number, phrase: string, translate: string): Promise<Phrase> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PHRASES}/${phraseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phrase, translate }),
  })
  if (!response.ok) {
    throw new Error("Failed to update phrase")
  }
  return response.json()
}

export async function deletePhrase(phraseId: number): Promise<void> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PHRASES}/${phraseId}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete phrase")
  }
}

export async function attachPhraseToCategory(phrase: string, translate: string): Promise<void> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.ATTACH_PHRASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phrase, translate }),
  })
  if (!response.ok) {
    throw new Error("Failed to attach phrase to category")
  }
}

// 修正: getPhraseDetail関数の改善
export async function getPhraseDetail(categoryId: number, phraseId: number): Promise<PhraseDetail> {
  console.log(`API call: ${API.BASE_URL}${API.ENDPOINTS.PHRASE_DETAIL}?categoryId=${categoryId}&phraseId=${phraseId}`)

  try {
    const response = await fetch(
      `${API.BASE_URL}${API.ENDPOINTS.PHRASE_DETAIL}?categoryId=${categoryId}&phraseId=${phraseId}`,
      {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}): ${errorText}`)
      throw new Error(`${ERROR_MESSAGES.FETCH_PHRASE_DETAIL} (${response.status})`)
    }

    const data = await response.json()
    console.log("API response data:", data)
    return data
  } catch (error) {
    console.error("Error in getPhraseDetail:", error)
    throw error
  }
}

export async function getWords(limit = API.LIMITS.DEFAULT, offset = 0): Promise<PaginatedResponse<Word>> {
  console.log(`API call: ${API.BASE_URL}${API.ENDPOINTS.WORDS}?limit=${limit}&offset=${offset}`)

  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.WORDS}?limit=${limit}&offset=${offset}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}): ${errorText}`)
      throw new Error(`${ERROR_MESSAGES.FETCH_WORDS} (${response.status})`)
    }

    const data = await response.json()
    console.log("API response data:", data)
    return data
  } catch (error) {
    console.error("Error in getWords:", error)
    throw error
  }
}

export async function getWord(wordId: number): Promise<Word> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.WORDS}/${wordId}`)
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_WORDS)
  }
  return response.json()
}

export async function createWord(word: string, translate: string, wordType: string, favorite = false): Promise<void> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.WORDS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word, translate, wordType, favorite }),
  })
  if (!response.ok) {
    throw new Error("Failed to create word")
  }
}

export async function updateWord(
  wordId: number,
  word: string,
  translate: string,
  wordType: string,
  favorite: boolean,
): Promise<Word> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.WORDS}/${wordId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word, translate, wordType, favorite }),
  })
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.UPDATE_FAVORITE)
  }
  return response.json()
}

export async function deleteWord(wordId: number): Promise<void> {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.WORDS}/${wordId}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete word")
  }
}

export async function getCategoryPhrases(
  categoryId: number,
  limit = API.LIMITS.DEFAULT,
  offset = 0,
): Promise<PaginatedResponse<any>> {
  const response = await fetch(
    `${API.BASE_URL}${API.ENDPOINTS.CATEGORY_PHRASE}?categoryId=${categoryId}&limit=${limit}&offset=${offset}`,
  )
  if (!response.ok) {
    throw new Error("Failed to fetch category phrases")
  }
  return response.json()
}

// お気に入り更新専用の関数（データベース反映のため）
export async function updateFavorite(wordId: number, favorite: boolean): Promise<Word> {
  // まず単語の現在の情報を取得
  const word = await getWord(wordId)

  // お気に入り状態を更新
  return updateWord(wordId, word.word, word.translate, word.wordType, favorite)
}
