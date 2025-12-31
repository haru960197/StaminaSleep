# 命令
本番環境へのデプロイに向けて、アプリケーションのコードを修正し、Docker設定を追加してください。

# 具体的なタスク

## 1. Environment Variables (Frontend & Backend)
ハードコーディングされているURLや機密情報を環境変数に置き換えてください。

- **Frontend (`frontend/src/lib/api.ts` 等)**
  - `baseURL` を `http://localhost:3001` から `process.env.NEXT_PUBLIC_API_URL` を使用するように変更してください。
  - ローカル開発時用に、環境変数が未定義の場合は `http://localhost:3001` にフォールバックするようにしてください。

- **Backend (`backend/src/main.ts` 等)**
  - CORS設定 (`app.enableCors`) を修正し、許可するオリジン（FrontendのURL）を環境変数 `FRONTEND_URL` から読み込むようにしてください。
  - ポート番号を環境変数 `PORT` から読み込み、未定義時は `3001` とするよう変更してください（Cloud Runは環境変数PORTを使用するため）。

- **Env Files**
  - フロント、バックエンドそれぞれに `.env.example` ファイルを作成し、必要なキー（`NEXT_PUBLIC_API_URL`, `FRONTEND_URL`, `DATABASE_URL` 等）をリストアップしてください。
  - `.env.example`はgit管理対象としてください。

## 2. Dockerfile for Nest.js (Backend)
- `backend` ディレクトリ直下に、本番運用に最適化された `Dockerfile` を作成してください。
- **要件:**
  - マルチステージビルド（BuildステージとProductionステージを分離）を使用し、イメージサイズを軽量化してください。
  - ベースイメージは `node:18-alpine` (またはプロジェクトのNodeバージョンに合わせる) を使用してください。
  - `npm ci` を使用して依存関係をクリーンインストールしてください。
  - Prisma Clientの生成 (`npx prisma generate`) をビルドプロセスに含めてください。
  - コンテナ起動時のコマンドは `node dist/main` (または `main.js`) になるようにしてください。

## 3. Scripts
- `package.json` (Backend) に、Prismaのマイグレーションを本番DBに適用するためのコマンドが含まれているか確認し、必要であれば `migrate:prod` などを追加してください。
