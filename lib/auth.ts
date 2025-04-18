import { jwtDecode } from "jwt-decode"
import { AUTH } from "@/constants"
import Cookies from "js-cookie"
import type { User } from "./api"

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
}

// Googleログイン用の関数
export async function signInWithGoogle(): Promise<User | null> {
  try {
    // Google OAuth認証ページにリダイレクト
    // 実際の実装ではGoogle OAuth APIを使用します
    // ここではモックデータを返します
    const mockUser: User = {
      id: "123456789",
      name: "テストユーザー",
      email: "test@example.com",
      image: "https://via.placeholder.com/150",
    }

    // ユーザー情報をCookieに保存
    Cookies.set(AUTH.COOKIES.USER, JSON.stringify(mockUser), { expires: 7 })
    Cookies.set(AUTH.COOKIES.TOKEN, "mock-token-123456789", { expires: 7 })

    return mockUser
  } catch (error) {
    console.error("Google login failed:", error)
    return null
  }
}

// ログアウト用の関数
export function signOut(): void {
  Cookies.remove(AUTH.COOKIES.USER)
  Cookies.remove(AUTH.COOKIES.TOKEN)
  window.location.href = "/"
}

// 現在のユーザーを取得
export function getCurrentUser(): User | null {
  const userCookie = Cookies.get(AUTH.COOKIES.USER)
  if (!userCookie) return null

  try {
    return JSON.parse(userCookie) as User
  } catch (error) {
    console.error("Failed to parse user cookie:", error)
    return null
  }
}

// 認証状態を確認
export function isAuthenticated(): boolean {
  const token = Cookies.get(AUTH.COOKIES.TOKEN)
  if (!token) return false

  try {
    const decoded: any = jwtDecode(token)
    const currentTime = Date.now() / 1000

    // トークンの有効期限をチェック
    return decoded.exp > currentTime
  } catch (error) {
    console.error("Invalid token:", error)
    return false
  }
}
