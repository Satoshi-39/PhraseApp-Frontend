# Docker を使用したローカル開発環境

このプロジェクトはDockerを使用してローカル開発環境を構築できます。

## 前提条件

- Docker
- Docker Compose

## 開発環境のセットアップ

### 1. フォントファイルの配置

添付のZen Maru Gothicフォントファイルを `public/fonts/Zen_Maru_Gothic` ディレクトリに配置してください。

### 2. Docker開発環境の起動

\`\`\`bash
# 開発用コンテナをビルドして起動
docker-compose -f docker-compose.dev.yml up --build

# バックグラウンドで実行する場合
docker-compose -f docker-compose.dev.yml up -d
\`\`\`

### 3. アプリケーションへのアクセス

ブラウザで http://localhost:3000 にアクセスすると、アプリケーションが表示されます。

## 開発のワークフロー

- ソースコードを変更すると、自動的にホットリロードされます
- コンテナ内でコマンドを実行する場合:
  \`\`\`bash
  docker-compose -f docker-compose.dev.yml exec app npm install some-package
  \`\`\`

## 開発環境の停止

\`\`\`bash
# コンテナを停止
docker-compose -f docker-compose.dev.yml down
\`\`\`

## トラブルシューティング

### node_modulesの問題が発生した場合

コンテナ内で依存関係を再インストールします:

\`\`\`bash
docker-compose -f docker-compose.dev.yml exec app npm install
\`\`\`

### ポートの競合が発生した場合

`docker-compose.dev.yml` ファイルのポート設定を変更します:

\`\`\`yaml
ports:
  - "3001:3000"  # ローカルの3001ポートをコンテナの3000ポートにマッピング
