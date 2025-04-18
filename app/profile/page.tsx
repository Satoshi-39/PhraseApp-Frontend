"use client"

import { Header } from "@/features/layout/header"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ROUTES, TEXT } from "@/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // ログインしていない場合はログインページにリダイレクト
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN)
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{TEXT.PROFILE.TITLE}</h1>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{TEXT.PROFILE.ACCOUNT_INFO}</h3>
                  <p className="text-sm text-muted-foreground">{TEXT.PROFILE.ACCOUNT_INFO_DESC}</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">{TEXT.PROFILE.NAME}</p>
                      <p className="text-sm text-muted-foreground">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{TEXT.PROFILE.EMAIL}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={logout}>
                {TEXT.PROFILE.LOGOUT}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
