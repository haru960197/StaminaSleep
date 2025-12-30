# 命令
アプリケーションのコア機能となるDBスキーマの定義と、基本的なCRUD処理、および画面の骨組みを実装してください。

# 具体的なタスク

## 1. Database (Backend)
`backend/prisma/schema.prisma` を編集し、以下のモデルを定義してください。
- `User`: ユーザー情報 (ID, email, 作成日など)
- `SleepLog`: 睡眠記録
  - 外部キー: User ID
  - 項目: 就寝時刻, 起床時刻, 睡眠の質(1-5段階), 起床時の気分(1-5段階), メモ
  - 気象データ保存用カラム: 気温(temperature), 気圧(pressure), 天気(weatherCondition)

定義後、マイグレーションを実行できる状態にしてください。

## 2. API Implementation (Backend)
Nest.jsにて以下のリソースを作成してください。
- Module: `SleepLogsModule`
- Controller: `POST /sleep-logs` (記録作成), `GET /sleep-logs` (履歴取得)
- Service: Prismaを使ってDBへの読み書きを行うロジック
- DTO: バリデーション付きの入力データ定義

## 3. Frontend Skeleton
Next.jsにて以下のページとコンポーネントを作成してください。
- `/` (Dashboard): 睡眠ログの一覧を表示するプレースホルダー
- `/entry` (Input Form): 睡眠記録を入力するフォーム（React Hook Formを使用推奨）
- API連携: `frontend/src/lib/api.ts` 等を作成し、Axiosでバックエンドと通信する設定を行ってください。

# 注意点
- フロントエンドとバックエンドの型定義（Interface/DTO）は整合性が取れるようにしてください。
- まだ認証機能は実装せず、User IDは固定値またはダミーを使用してください。
