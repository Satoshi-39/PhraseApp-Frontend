// API関連の定数
export const API = {
  // サーバーサイドでのみ使用する値
  BASE_URL: process.env.API_URL || "https://phraseapp-backend-production-53ba.up.railway.app",
  ENDPOINTS: {
    CATEGORIES: "/category",
    PHRASES: "/phrase",
    WORDS: "/word",
    PHRASE_DETAIL: "/phraseDetail",
    CATEGORY_PHRASE: "/categoryPhrase",
    ATTACH_PHRASE: "/attachPhraseToCategory",
  },
  LIMITS: {
    DEFAULT: 20,
  },
}
