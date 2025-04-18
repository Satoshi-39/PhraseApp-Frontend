#!/bin/bash
# コンテナを停止
docker stop $(docker ps -q --filter ancestor=phraseapp-frontend) 2>/dev/null || true

# イメージを再ビルド
docker build -t phraseapp-frontend .

# コンテナを実行
docker run -p 3000:3000 -v $(pwd):/app/PhraseApp-Frontend -v /app/PhraseApp-Frontend/node_modules -v /app/PhraseApp-Frontend/.next phraseapp-frontend
