# 命令
データモデルの仕様変更と、ログの編集機能を実装してください。

# 具体的なタスク

## 1. Schema & Data Model Update (Backend)
- `prisma/schema.prisma` の `SleepLog` モデルを変更してください。
  - 既存の `mood` カラムを `vitality`（その日の活力）という名前にリネーム、または置き換えてください。
  - `vitality` カラムは **Optional (Nullable)** に設定してください（必須項目から任意項目へ変更）。
- Backendの `CreateSleepLogDto` と `UpdateSleepLogDto` を修正してください。
  - `vitality` フィールドを `IsOptional()` とし、バリデーションを調整してください。
- マイグレーションを作成・実行してDBに反映してください。

## 2. Update API Implementation (Backend)
- `SleepLogsController` に `PATCH /sleep-logs/:id` エンドポイントを作成してください。
- `SleepLogsService` に更新ロジックを実装してください。
  - **重要な制約**: 更新できるのはユーザー入力項目（就寝・起床時刻、睡眠の質、vitality、メモ）のみとしてください。
  - **初期作成時に自動取得した気象データ（temperature, pressure, weatherCondition）は、更新処理で決して上書きしない（無視する）ように実装してください。**
- 更新対象のログが、リクエストしたユーザー本人のものであるか確認するガード処理も含めてください。

## 3. Edit UI Implementation (Frontend)
- `/entry` ページの「Recent Logs」リストコンポーネントを改修してください。
  - リストアイテムをクリック可能（Cursor pointer）にしてください。
  - アイテムクリック時に、Shadcn UIの `Dialog`（モーダル）を開き、編集フォームを表示してください。
- **編集フォームの挙動**:
  - React Hook Formを使用し、クリックしたログの既存データを初期値(`defaultValues`)としてセットしてください。
  - `vitality` は任意項目として入力できるようにしてください。
  - 「更新」ボタン押下時に、Backendの `PATCH` APIを呼び出し、成功したらモーダルを閉じてリストを再取得してください。

# 注意点
- Frontendの型定義（Interface）もBackendの変更に合わせて `mood` を `vitality` (optional) に更新してください。
