#!/bin/bash

MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  echo "Building Docker image (Attempt $(($RETRY_COUNT + 1))/$MAX_RETRIES)..."
  
  # Dockerイメージのビルドを試行
  docker build -t phraseapp-frontend .
  
  # ビルドが成功した場合
  if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # コンテナを実行
    docker run -p 3000:3000 -v $(pwd):/app/PhraseApp-Frontend -v /app/PhraseApp-Frontend/node_modules -v /app/PhraseApp-Frontend/.next phraseapp-frontend
    
    exit 0
  fi
  
  # 失敗した場合、カウントを増やして再試行
  RETRY_COUNT=$(($RETRY_COUNT + 1))
  echo "Build failed. Retrying in 10 seconds..."
  sleep 10
done

echo "Failed to build Docker image after $MAX_RETRIES attempts."
exit 1
