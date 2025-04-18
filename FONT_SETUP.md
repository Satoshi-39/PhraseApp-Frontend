# フォントファイルの配置手順

1. Zen Maru Gothicフォントファイルを `public/fonts/Zen_Maru_Gothic` ディレクトリに配置してください。
   - ファイル名は `ZenMaruGothic-Regular.ttf` である必要があります。

2. 配置後、アプリケーションを再起動するか、Dockerイメージを再ビルドしてください。

## Dockerでの実行方法

### 開発環境

\`\`\`bash
# 開発用コンテナをビルドして起動
docker-compose -f docker-compose.dev.yml up --build

# バックグラウンドで実行する場合
docker-compose -f docker-compose.dev.yml up -d
\`\`\`

### 本番環境

\`\`\`bash
# 本番用コンテナをビルドして起動
docker-compose up --build

# バックグラウンドで実行する場合
docker-compose up -d
\`\`\`

## フォントファイルの確認

フォントファイルが正しく配置されていれば、アプリケーションは自動的にそれを使用します。フォントが正しく適用されているかは、アプリケーションのヘッダーにある「PEAR」のロゴテキストで確認できます。
