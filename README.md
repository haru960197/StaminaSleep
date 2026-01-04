# StaminaSleep

[English](#english) | [日本語](#japanese)

<a name="english"></a>
## English

### Overview
StaminaSleep is a comprehensive sleep analysis application designed to help users understand their sleep patterns. By tracking sleep duration, quality, and correlating it with external factors like weather and internal factors like daily vitality, users can gain insights to improve their rest.

### Features
- **Sleep Logging:** Record bedtime, wake time, and subjective sleep quality (1-5 stars).
- **Vitality Tracking:** Log daily vitality/mood levels to see how sleep affects your day.
- **Weather Integration:** Automatically records weather conditions, temperature, and pressure to analyze environmental impacts on sleep.
- **Data Visualization:** View charts and trends of your sleep history to identify patterns.
- **User Authentication:** Secure login and data management using Firebase Authentication.

### Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Recharts, Firebase SDK.
- **Backend:** NestJS, TypeScript, Prisma (PostgreSQL), Firebase Admin SDK.
- **Database:** PostgreSQL.
- **Infrastructure:** Docker (for local database).

### Getting Started (For Developers)

#### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- Firebase Project (for authentication)

#### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd StaminaSleep
   ```

2. **Setup Backend:**
   Navigate to the backend directory and install dependencies.
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/staminasleep?schema=public"
   # Add other necessary variables (e.g., Firebase Service Account credentials)
   ```
   Generate Prisma client:
   ```bash
   npx prisma generate
   ```

3. **Setup Frontend:**
   Navigate to the frontend directory and install dependencies.
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env.local` file in the `frontend` directory with your Firebase config and Backend URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   # Add other Firebase config variables
   ```

4. **Start Database:**
   From the root directory, start the PostgreSQL container.
   ```bash
   cd ..
   docker-compose up -d
   ```

5. **Run Migrations:**
   Apply database migrations.
   ```bash
   cd backend
   npx prisma migrate dev
   ```

6. **Start Servers:**
   - **Backend:**
     ```bash
     cd backend
     npm run start:dev
     ```
   - **Frontend:**
     ```bash
     cd frontend
     npm run dev
     ```

---

<a name="japanese"></a>
## Japanese (日本語)

### 概要
StaminaSleepは、ユーザーの睡眠パターンを深く理解するための睡眠分析アプリケーションです。睡眠時間や質を記録し、天気などの外的要因や日々の「活力（Vitality）」といった内的要因と関連付けることで、より良い休息を得るための洞察を提供します。

### 機能
- **睡眠記録:** 就寝・起床時間、主観的な睡眠の質（1-5段階）を簡単に記録できます。
- **活力トラッキング:** その日の活力や気分を記録し、睡眠が日中のパフォーマンスに与える影響を可視化します。
- **天気連携:** 気温、気圧、天気予報を自動的に記録し（または入力し）、環境が睡眠に与える影響を分析します。
- **データ可視化:** 睡眠履歴や傾向をグラフで表示し、自身のパターンを把握できます。
- **ユーザー認証:** Firebaseを使用した安全なログインとデータ管理を提供します。

### 技術スタック
- **フロントエンド:** Next.js (App Router), TypeScript, Tailwind CSS, Recharts, Firebase SDK.
- **バックエンド:** NestJS, TypeScript, Prisma (PostgreSQL), Firebase Admin SDK.
- **データベース:** PostgreSQL.
- **インフラ:** Docker (ローカルDB用).

### 開発者向けガイド

#### 前提条件
- Node.js (v18以上)
- Docker & Docker Compose
- Firebaseプロジェクト (認証用)

#### インストール手順

1. **リポジトリのクローン:**
   ```bash
   git clone <repository-url>
   cd StaminaSleep
   ```

2. **バックエンドのセットアップ:**
   `backend` ディレクトリに移動し、依存関係をインストールします。
   ```bash
   cd backend
   npm install
   ```
   `backend` ディレクトリに `.env` ファイルを作成し、必要な変数を設定します。
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/staminasleep?schema=public"
   # その他、Firebase Service Accountなどの設定
   ```
   Prismaクライアントを生成します:
   ```bash
   npx prisma generate
   ```

3. **フロントエンドのセットアップ:**
   `frontend` ディレクトリに移動し、依存関係をインストールします。
   ```bash
   cd ../frontend
   npm install
   ```
   `frontend` ディレクトリに `.env.local` ファイルを作成し、Firebase設定とバックエンドURLを設定します。
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   # その他のFirebase設定変数
   ```

4. **データベースの起動:**
   ルートディレクトリからDocker Composeを使用してPostgreSQLを起動します。
   ```bash
   cd ..
   docker-compose up -d
   ```

5. **マイグレーションの実行:**
   データベースへのマイグレーションを適用します。
   ```bash
   cd backend
   npx prisma migrate dev
   ```

6. **サーバーの起動:**
   - **バックエンド:**
     ```bash
     cd backend
     npm run start:dev
     ```
   - **フロントエンド:**
     ```bash
     cd frontend
     npm run dev
     ```
