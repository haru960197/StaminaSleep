# 命令
睡眠分析アプリケーションのためのプロジェクト環境構築を行ってください。
以下の要件に従い、ルートディレクトリ直下に `frontend` と `backend` のディレクトリを作成し、それぞれのフレームワークを初期化してください。

# 構成要件

## 全体
- パッケージ管理: npm または yarn
- 開発環境: ルートに `docker-compose.yml` を作成し、ローカル開発用のPostgreSQLデータベースを定義すること。

## Frontend
- フレームワーク: Next.js (最新版, App Router使用)
- 言語: TypeScript
- UIライブラリ: Tailwind CSS, Shadcn/UI (initまで行うこと)
- 主要パッケージインストール: 
  - `axios` (API通信)
  - `recharts` (グラフ描画)
  - `lucide-react` (アイコン)
  - `dayjs` (日付操作)

## Backend
- フレームワーク: Nest.js (最新版)
- 言語: TypeScript
- データベースORM: Prisma (PostgreSQL向けに初期化)
- 主要パッケージインストール:
  - `@nestjs/config` (環境変数管理)
  - `@nestjs/swagger` (APIドキュメント)
  - `class-validator`, `class-transformer` (バリデーション)

# 出力アクション
1. 各フレームワークの初期化コマンドを実行してください。
2. `docker-compose.yml` (Postgres設定) を作成してください。
3. `frontend` と `backend` がそれぞれ起動確認できる状態にしてください。
