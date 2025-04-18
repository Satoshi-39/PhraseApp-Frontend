# Dockerを使用したアプリケーションの実行

このプロジェクトはDockerを使用して開発環境と本番環境の両方で実行できます。

## フォントファイルの配置

1. Zen Maru Gothicフォントファイルを `public/fonts/Zen_Maru_Gothic` ディレクトリに配置してください。
   - ファイル名は `ZenMaruGothic-Regular.ttf` である必要があります。

## 開発環境での実行

開発環境では、コードの変更がホットリロードされます。

\`\`\`bash
# イメージをビルド
docker build -t phraseapp-frontend .

# コンテナを実行
docker run -p 3000:3000 -v $(pwd):/app/PhraseApp-Frontend -v /app/PhraseApp-Frontend/node_modules -v /app/PhraseApp-Frontend/.next phraseapp-frontend
\`\`\`

## 本番環境での実行

本番環境では、最適化されたビルドが実行されます。

\`\`\`bash
# イメージをビルド
docker build -t phraseapp-frontend-prod -f Dockerfile.prod .

# コンテナを実行
docker run -p 3000:3000 phraseapp-frontend-prod
\`\`\`

## 環境変数の設定

環境変数を設定する場合は、`docker run`コマンドに`-e`オプションを追加します。

\`\`\`bash
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://your-api-url phraseapp-frontend
\`\`\`

## ボリュームマウントについて

開発環境では、以下のボリュームをマウントしています：

- `$(pwd):/app/PhraseApp-Frontend`: ローカルのプロジェクトディレクトリをコンテナの `/app/PhraseApp-Frontend` ディレクトリにマウント
- `/app/PhraseApp-Frontend/node_modules`: コンテナ内の `node_modules` ディレクトリを保持
- `/app/PhraseApp-Frontend/.next`: コンテナ内の `.next` ディレクトリを保持

これにより、ローカルでのコード変更がコンテナ内にリアルタイムで反映されます。
