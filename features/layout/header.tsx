"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { ROUTES, UI } from "@/constants"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, signIn, logout } = useAuth()

  const isLandingPage = pathname === ROUTES.HOME
  const bgClass = isLandingPage ? "lp-background" : "bg-background"

  // メニューが開いている時にスクロールを無効にする
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const handleLogin = async () => {
    await signIn()
  }

  return (
    <>
      <header className={`${bgClass} sticky top-0 z-50 w-full border-b`}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <Image src="/images/pear-icon.png" alt="Pear Logo" width={32} height={32} />
              <span className="font-zen-maru-gothic text-xl font-bold">{UI.APP_NAME}</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {UI.NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith(item.href) ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image} alt={user?.name || ""} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.PROFILE}>プロフィール</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>ログアウト</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={handleLogin} className="hidden md:flex">
                ログイン
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* モバイルメニュー - 画面全体に表示 */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background pt-16 overflow-y-auto">
          <div className="container py-6 flex flex-col h-full">
            <nav className="flex flex-col space-y-6">
              {UI.NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    pathname.startsWith(item.href) ? "text-foreground" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {!isAuthenticated ? (
                <Button variant="default" size="lg" onClick={handleLogin} className="w-full mt-4">
                  ログイン
                </Button>
              ) : (
                <div className="space-y-4 mt-4">
                  <div className="flex items-center gap-3 p-2 border rounded-md">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.image} alt={user?.name || ""} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>

                  <Link href={ROUTES.PROFILE} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      プロフィール
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                  >
                    ログアウト
                  </Button>
                </div>
              )}
            </nav>

            <div className="mt-auto pt-6 border-t">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Pear</p>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
