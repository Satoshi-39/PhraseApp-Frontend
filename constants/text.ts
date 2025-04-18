// 各ページやコンポーネントで使用されるテキスト
export const TEXT = {
  COMMON: {
    LOADING: "読み込み中...",
    SEARCH: "検索...",
    VIEW_DETAILS: "詳細を見る",
    VIEW_PHRASES: "フレーズを見る",
    ADD: "追加",
    CANCEL: "キャンセル",
    SAVE: "保存",
    DELETE: "削除",
    EDIT: "編集",
    NEXT: "次へ",
    PREVIOUS: "前へ",
    SUBMIT: "送信",
  },
  CATEGORIES: {
    TITLE: "カテゴリー",
    SEARCH_PLACEHOLDER: "カテゴリーを検索...",
    LOADING: "カテゴリーを読み込み中...",
    PHRASES_RANGE_1: "フレーズ 1-10",
    PHRASES_RANGE_2: "フレーズ 11-20",
  },
  PHRASES: {
    TITLE: "フレーズ",
    SEARCH_PLACEHOLDER: "フレーズを検索...",
    LOADING: "フレーズを読み込み中...",
    BY_CATEGORY: "カテゴリー別フレーズ",
  },
  PHRASE_DETAIL: {
    TITLE: "フレーズ詳細",
    SEARCH_PLACEHOLDER: "単語を検索...",
    LOADING: "フレーズ詳細を読み込み中...",
    TRANSLATION: "翻訳",
    WORDS_TITLE: "単語",
    ALL_WORDS: "すべての単語",
    ADD_WORD: "単語を追加",
    NEW_WORD: "新しい単語を追加",
    WORD_LABEL: "単語",
    WORD_PLACEHOLDER: "単語を入力",
    TRANSLATION_LABEL: "翻訳",
    TRANSLATION_PLACEHOLDER: "翻訳を入力",
    WORD_TYPE_LABEL: "品詞",
    WORD_TYPE_PLACEHOLDER: "例: 名詞、動詞、形容詞",
    EXISTING_WORDS: "既存の単語",
    NEXT_PHRASE: "次のフレーズ",
    PREVIOUS_PHRASE: "前のフレーズ",
  },
  WORDS: {
    TITLE: "単語",
    SEARCH_PLACEHOLDER: "単語を検索...",
    LOADING: "単語を読み込み中...",
  },
  LOGIN: {
    TITLE: "ログイン",
    DESCRIPTION: "アカウントにログインして、学習を続けましょう",
    GOOGLE_LOGIN: "Googleでログイン",
    TERMS: "ログインすることで、利用規約とプライバシーポリシーに同意したことになります。",
  },
  PROFILE: {
    TITLE: "プロフィール",
    ACCOUNT_INFO: "アカウント情報",
    ACCOUNT_INFO_DESC: "アカウントの基本情報を管理します。",
    NAME: "名前",
    EMAIL: "メールアドレス",
    LOGOUT: "ログアウト",
  },
  LANDING: {
    HERO_TITLE: "フレーズを効率的に学習",
    HERO_DESCRIPTION: "直感的なフレーズ学習アプリで言語学習の旅を強化しましょう。",
    START_BUTTON: "始める",
    EXPLORE_BUTTON: "フレーズを探す",
    FEATURES_TITLE: "主な機能",
    FEATURES_DESCRIPTION: "Pearが提供する学習に役立つ機能をご紹介します",
    FEATURE_CATEGORIES: {
      TITLE: "カテゴリー別学習",
      DESCRIPTION: "トピック別にフレーズをカテゴリー分けし、効率的に学習できます。",
    },
    FEATURE_PRONUNCIATION: {
      TITLE: "発音練習",
      DESCRIPTION: "ネイティブの発音を聞いて、自分の発音を向上させましょう。",
    },
    FEATURE_FAVORITES: {
      TITLE: "お気に入り機能",
      DESCRIPTION: "重要な単語やフレーズをお気に入りに登録して、後で復習できます。",
    },
    FEATURE_PROGRESS: {
      TITLE: "進捗管理",
      DESCRIPTION: "学習の進捗を追跡し、自分のペースで学習を進めることができます。",
    },
    PRICING_TITLE: "料金プラン",
    PRICING_DESCRIPTION: "あなたのニーズに合わせた柔軟なプランをご用意しています",
    PRICING_FREE: {
      TITLE: "無料プラン",
      DESCRIPTION: "個人学習に最適",
      PRICE: "¥0",
      FEATURES: ["基本的なフレーズ学習", "カテゴリー別学習", "発音練習"],
      BUTTON: "今すぐ始める",
    },
    PRICING_PREMIUM: {
      TITLE: "プレミアムプラン",
      DESCRIPTION: "本格的な学習に",
      PRICE: "¥980",
      PERIOD: "/月",
      BADGE: "人気",
      FEATURES: ["無料プランのすべての機能", "無制限のフレーズアクセス", "詳細な進捗管理", "広告なし"],
      BUTTON: "7日間無料トライアル",
    },
    PRICING_BUSINESS: {
      TITLE: "ビジネスプラン",
      DESCRIPTION: "チームや企業向け",
      PRICE: "¥4,980",
      PERIOD: "/月",
      FEATURES: ["プレミアムプランのすべての機能", "最大10ユーザーまで", "ビジネス向けコンテンツ", "専任サポート"],
      BUTTON: "お問い合わせ",
    },
    REVIEWS_TITLE: "ユーザーからの評価",
    REVIEWS_DESCRIPTION: "Pearを使用しているユーザーの声をご紹介します",
    REVIEWS: [
      {
        NAME: "田中 健太",
        INITIAL: "T",
        RATING: 5,
        TEXT: "「カテゴリー別に学習できるので、自分の興味のある分野から始められて良いです。発音機能も便利で、リスニング力が向上しました。」",
      },
      {
        NAME: "佐藤 美咲",
        INITIAL: "S",
        RATING: 4,
        TEXT: "「お気に入り機能が特に便利です。復習したいフレーズをマークしておけるので、効率的に学習できています。インターフェースもシンプルで使いやすいです。」",
      },
      {
        NAME: "山田 太郎",
        INITIAL: "Y",
        RATING: 5,
        TEXT: "「ビジネス英語を学ぶのに最適です。実際の会話で使えるフレーズが多く、仕事での英語コミュニケーションに自信がつきました。プレミアムプランの価値は十分あります。」",
      },
    ],
    FAQ_TITLE: "よくある質問",
    FAQ_DESCRIPTION: "ご不明な点がございましたら、お気軽にお問い合わせください",
    CTA_TITLE: "今すぐ学習を始めましょう",
    CTA_DESCRIPTION: "無料でアカウントを作成して、フレーズ学習の旅を始めましょう。",
    CTA_BUTTON_1: "カテゴリーを見る",
    CTA_BUTTON_2: "ログイン",
    FOOTER_COPYRIGHT: "© {year} Pear. All rights reserved.",
  },
}
