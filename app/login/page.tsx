"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/features/layout/header"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ROUTES, TEXT } from "@/constants"
import { FcGoogle } from "react-icons/fc"

export default function LoginPage() {
  const { signIn, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // すでにログインしている場合はホームページにリダイレクト
    if (isAuthenticated) {
      router.push(ROUTES.HOME)
    }
  }, [isAuthenticated, router])

  const handleGoogleLogin = async () => {
    const user = await signIn()
    if (user) {
      router.push(ROUTES.HOME)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{TEXT.LOGIN.TITLE}</CardTitle>
            <CardDescription>{TEXT.LOGIN.DESCRIPTION}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" onClick={handleGoogleLogin} className="w-full">
              <FcGoogle className="mr-2 h-4 w-4" />
              {TEXT.LOGIN.GOOGLE_LOGIN}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mt-2">{TEXT.LOGIN.TERMS}</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
