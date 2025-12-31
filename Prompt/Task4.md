# 命令
アプリケーションにFirebase Authenticationを使用した認証機能を実装し、既存のAPIを保護されたルートに変更してください。

# 前提条件
- Authプロバイダー: Firebase Authentication (Email/Password, Google)
- フロントエンド: Firebase JS SDKを使用
- バックエンド: Firebase Admin SDKを使用してトークンを検証

# 具体的なタスク

## 1. Firebase Setup (Frontend & Backend)
- フロントエンド (`frontend`) に `firebase` パッケージをインストールし、`src/lib/firebase.ts` で初期化してください。
- バックエンド (`backend`) に `firebase-admin` をインストールし、Service Accountを使用して初期化するモジュールを作成してください。

## 2. Frontend Auth Implementation
- `AuthContext` (React Context) を作成し、ログイン状態とUserオブジェクトを全域で管理してください。
- 以下のページを作成・実装してください。
  - `/login`: ログイン・新規登録ページ（Email/Pass または Googleログイン）。
- **Axios Interceptorの設定**:
  - バックエンドへのリクエスト送信前に、Firebaseの `getIdToken()` でトークンを取得し、Authorization Header (`Bearer <token>`) に付与するInterceptorを実装してください。
- 未ログイン状態で `/` や `/entry` にアクセスした場合、`/login` にリダイレクトする処理を追加してください。

## 3. Backend Auth Guard & User Sync
- `AuthGuard` を作成してください。
  - リクエストヘッダーの Bearer Token を検証し、有効であれば `request.user` にデコード情報をセットする処理。
- **User Synchronization**:
  - トークン検証成功時、そのFirebase UIDを持つユーザーがDBの `User` テーブルに存在するか確認し、存在しない場合は自動生成（Upsert）するロジックを実装してください。
  - `prisma/schema.prisma` の `User` モデルに `firebaseUid` フィールドを追加し（ユニーク制約）、マイグレーションを実行してください。

## 4. Refactoring (Important)
- 既存の `SleepLogsController` および `SleepLogsService` を修正してください。
  - これまで固定値/ダミーで使用していた `userId` を廃止してください。
  - 代わりに、`@Req() req` またはカスタムデコレーター `@CurrentUser()` を使用して、認証済みのユーザーID（DBのID）を使ってデータの保存・取得を行うように変更してください。

# 注意点
- FirebaseのAPIキーなどの環境変数は `.env` に定義する前提のコードにしてください（値は空で構いません）。
- 既存のテストコードや型定義で、`userId` に依存している箇所があれば修正してください。
