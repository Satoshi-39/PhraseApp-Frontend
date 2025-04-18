import { Header } from "@/features/layout/header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ROUTES, TEXT, UI } from "@/constants"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lp-background">
      <Header />
      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  {TEXT.LANDING.HERO_TITLE}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300 md:text-xl">
                  {TEXT.LANDING.HERO_DESCRIPTION}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={ROUTES.CATEGORIES}>
                  <Button size="lg">{TEXT.LANDING.START_BUTTON}</Button>
                </Link>
                <Link href={ROUTES.PHRASES}>
                  <Button variant="outline" size="lg">
                    {TEXT.LANDING.EXPLORE_BUTTON}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 機能紹介セクション */}
        <section className="py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{TEXT.LANDING.FEATURES_TITLE}</h2>
              <p className="mt-4 text-muted-foreground">{TEXT.LANDING.FEATURES_DESCRIPTION}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{TEXT.LANDING.FEATURE_CATEGORIES.TITLE}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{TEXT.LANDING.FEATURE_CATEGORIES.DESCRIPTION}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{TEXT.LANDING.FEATURE_PRONUNCIATION.TITLE}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{TEXT.LANDING.FEATURE_PRONUNCIATION.DESCRIPTION}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{TEXT.LANDING.FEATURE_FAVORITES.TITLE}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{TEXT.LANDING.FEATURE_FAVORITES.DESCRIPTION}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{TEXT.LANDING.FEATURE_PROGRESS.TITLE}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{TEXT.LANDING.FEATURE_PROGRESS.DESCRIPTION}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {UI.FEATURES.map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/20 p-4">
                    <Image src="/images/pear-icon.png" alt={feature.title} width={48} height={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 料金プランセクション */}
        <section className="py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{TEXT.LANDING.PRICING_TITLE}</h2>
              <p className="mt-4 text-muted-foreground">{TEXT.LANDING.PRICING_DESCRIPTION}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>{TEXT.LANDING.PRICING_FREE.TITLE}</CardTitle>
                  <CardDescription>{TEXT.LANDING.PRICING_FREE.DESCRIPTION}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-4xl font-bold mb-4">{TEXT.LANDING.PRICING_FREE.PRICE}</div>
                  <ul className="space-y-2">
                    {TEXT.LANDING.PRICING_FREE.FEATURES.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{TEXT.LANDING.PRICING_FREE.BUTTON}</Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col border-primary">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{TEXT.LANDING.PRICING_PREMIUM.TITLE}</CardTitle>
                    <Badge>{TEXT.LANDING.PRICING_PREMIUM.BADGE}</Badge>
                  </div>
                  <CardDescription>{TEXT.LANDING.PRICING_PREMIUM.DESCRIPTION}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-4xl font-bold mb-4">
                    {TEXT.LANDING.PRICING_PREMIUM.PRICE}
                    <span className="text-base font-normal">{TEXT.LANDING.PRICING_PREMIUM.PERIOD}</span>
                  </div>
                  <ul className="space-y-2">
                    {TEXT.LANDING.PRICING_PREMIUM.FEATURES.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    {TEXT.LANDING.PRICING_PREMIUM.BUTTON}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>{TEXT.LANDING.PRICING_BUSINESS.TITLE}</CardTitle>
                  <CardDescription>{TEXT.LANDING.PRICING_BUSINESS.DESCRIPTION}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-4xl font-bold mb-4">
                    {TEXT.LANDING.PRICING_BUSINESS.PRICE}
                    <span className="text-base font-normal">{TEXT.LANDING.PRICING_BUSINESS.PERIOD}</span>
                  </div>
                  <ul className="space-y-2">
                    {TEXT.LANDING.PRICING_BUSINESS.FEATURES.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    {TEXT.LANDING.PRICING_BUSINESS.BUTTON}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* ユーザーレビューセクション */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{TEXT.LANDING.REVIEWS_TITLE}</h2>
              <p className="mt-4 text-muted-foreground">{TEXT.LANDING.REVIEWS_DESCRIPTION}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TEXT.LANDING.REVIEWS.map((review, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/20 p-2">
                        <span className="text-xl font-bold">{review.INITIAL}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{review.NAME}</CardTitle>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.RATING ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.TEXT}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* よくある質問セクション */}
        <section className="py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{TEXT.LANDING.FAQ_TITLE}</h2>
              <p className="mt-4 text-muted-foreground">{TEXT.LANDING.FAQ_DESCRIPTION}</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {UI.FAQ.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{TEXT.LANDING.CTA_TITLE}</h2>
                <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300 md:text-xl">
                  {TEXT.LANDING.CTA_DESCRIPTION}
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Link href={ROUTES.CATEGORIES}>
                    <Button className="w-full">{TEXT.LANDING.CTA_BUTTON_1}</Button>
                  </Link>
                  <Link href={ROUTES.LOGIN}>
                    <Button variant="outline" className="w-full">
                      {TEXT.LANDING.CTA_BUTTON_2}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {TEXT.LANDING.FOOTER_COPYRIGHT.replace("{year}", new Date().getFullYear().toString())}
          </p>
        </div>
      </footer>
    </div>
  )
}
