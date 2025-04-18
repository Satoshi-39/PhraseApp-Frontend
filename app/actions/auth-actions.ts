"use server"

import { cookies } from "next/headers"
import { AUTH } from "@/constants"
import type { User } from "@/lib/api"

// Googleログイン用のサーバーアクション
export async function serverSignInWithGoogle(): Promise<User> {
  // 実際の実装ではGoogle OAuth APIを使用します
  // ここではモックデータを返します
  const mockUser: User = {
    id: "123456789",
    name: "テストユーザー",
    email: "test@example.com",
    image: "https://via.placeholder.com/150",
  }

  // ユーザー情報をCookieに保存（サーバーサイド）
  const cookieStore = cookies()
  cookieStore.set(AUTH.COOKIES.USER, JSON.stringify(mockUser), { maxAge: 60 * 60 * 24 * 7 }) // 7日間
  cookieStore.set(AUTH.COOKIES.TOKEN, "mock-token-123456789", { maxAge: 60 * 60 * 24 * 7 }) // 7日間

  return mockUser
}

// ログアウト用のサーバーアクション
export async function serverSignOut(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete(AUTH.COOKIES.USER)
  cookieStore.delete(AUTH.COOKIES.TOKEN)
}

// 現在のユーザーを取得するサーバーアクション
export async function serverGetCurrentUser(): Promise<User | null> {
  const cookieStore = cookies()
  const userCookie = cookieStore.get(AUTH.COOKIES.USER)

  if (!userCookie?.value) return null

  try {
    return JSON.parse(userCookie.value) as User
  } catch (error) {
    console.error("Failed to parse user cookie:", error)
    return null
  }
}

// 認証状態を確認するサーバーアクション
export async function serverIsAuthenticated(): Promise<boolean> {
  const cookieStore = cookies()
  const token = cookieStore.get(AUTH.COOKIES.TOKEN)

  if (!token?.value) return false

  // 実際の実装ではJWTの検証を行います
  return true
}
