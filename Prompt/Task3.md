# 命令
アプリケーションに「気象データ自動取得」と「データ分析・可視化」の機能を追加してください。

# 具体的なタスク

## 1. OpenWeatherMap Integration (Backend)
- `WeatherService` を作成し、OpenWeatherMap APIから現在の天気・気圧・気温を取得するメソッドを実装してください。
- `SleepLogsService` の作成処理(`POST`)の中にこのServiceを組み込み、ログ保存時に自動的にその時点の気象データをDBに保存するようにしてください。
- APIキーは `.env` から読み込むように設定してください。

## 2. Data Analysis (Backend)
- `AnalysisService` を作成してください。
- 蓄積された `SleepLog` データを基に、以下の統計情報を計算するロジックを追加してください。
  - 平均睡眠時間
  - 「気圧」と「起床時の気分」の相関係数 (simple-statistics 等のライブラリを使用)
  - 「良い睡眠（質が高い）」時の平均気温・平均気圧
- `GET /analysis` エンドポイントを作成し、これらの分析結果を返却してください。

## 3. Visualization (Frontend)
- Dashboardページ (`/`) を更新してください。
- `recharts` を使用して、以下のグラフを描画してください。
  - 直近7日間の睡眠時間の推移（棒グラフ）
  - 気圧と気分の散布図（Scatter chart）
- バックエンドの `/analysis` から取得したデータをもとに、「良い睡眠のためのフィードバック（例：気圧が高い日は気分が良い傾向があります）」をテキスト表示するセクションを追加してください。
