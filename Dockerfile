FROM node:20-alpine

WORKDIR /app/PhraseApp-Frontend

# npmの設定を調整
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-retry-maxtimeout 600000
RUN npm config set fetch-timeout 600000
RUN npm config set fetch-retries 5

# 依存関係のファイルをコピー（UTF-8エンコーディングを確保）
COPY package.json package.json
COPY package-lock.json* ./

# 依存関係のインストール
RUN npm install --legacy-peer-deps

# 設定ファイルをコピー
COPY postcss.config.js ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./
COPY next.config.mjs ./

# ソースコードをコピー
COPY . .

# 開発モードで起動
CMD ["npm", "run", "dev"]
