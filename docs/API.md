# APIドキュメント

# 目次

- [APIドキュメント](#apiドキュメント)
- [目次](#目次)
- [APIエンドポイント](#apiエンドポイント)
  - [プレフィクス](#プレフィクス)
  - [認証（JWT）](#認証jwt)
    - [Auth0発行JWT](#auth0発行jwt)
    - [認証が必要なエンドポイント](#認証が必要なエンドポイント)
  - [共通レスポンスボディ](#共通レスポンスボディ)
    - [成功時](#成功時)
    - [失敗時](#失敗時)
  - [ユーザー関連処理](#ユーザー関連処理)
    - [ユニバーサルサインアップ `POST /universal/signup`](#ユニバーサルサインアップ-post-universalsignup)
      - [リクエストボディ](#リクエストボディ)
      - [レスポンスボディ](#レスポンスボディ)
    - [ユニバーサールログイン `POST /universal/login`](#ユニバーサールログイン-post-universallogin)
      - [リクエストボディ](#リクエストボディ-1)
      - [レスポンスボディ](#レスポンスボディ-1)
    - [ソーシャルサインアップ `POST /social/signup`](#ソーシャルサインアップ-post-socialsignup)
      - [リクエストヘッダー](#リクエストヘッダー)
      - [リクエストボディ](#リクエストボディ-2)
      - [レスポンスボディ](#レスポンスボディ-2)
    - [ソーシャルログイン `POST /social/login`](#ソーシャルログイン-post-sociallogin)
      - [リクエストヘッダー](#リクエストヘッダー-1)
      - [レスポンスボディ](#レスポンスボディ-3)
    - [ソーシャルログアウト `POST /social/logout`](#ソーシャルログアウト-post-sociallogout)
      - [リクエストヘッダー](#リクエストヘッダー-2)
      - [レスポンスボディ](#レスポンスボディ-4)
    - [ユニバーサルログアウト `POST /universal/logout`](#ユニバーサルログアウト-post-universallogout)
      - [リクエストヘッダー](#リクエストヘッダー-3)
      - [レスポンスボディ](#レスポンスボディ-5)
    - [プロフィール取得 `GET /profile/{user_id}`](#プロフィール取得-get-profileuser_id)
      - [パスパラメータ](#パスパラメータ)
      - [レスポンスボディ](#レスポンスボディ-6)
    - [プロフィール情報登録 `PATCH /profile/edit`](#プロフィール情報登録-patch-profileedit)
      - [リクエストボディ](#リクエストボディ-3)
    - [プロフィールアイコン編集 `POST /user/upload/image`](#プロフィールアイコン編集-post-useruploadimage)
      - [リクエストヘッダー](#リクエストヘッダー-4)
      - [レスポンスボディ](#レスポンスボディ-7)
  - [フレンド関連処理](#フレンド関連処理)
    - [フレンド申請送信 `POST /friends/request`](#フレンド申請送信-post-friendsrequest)
      - [リクエストボディ](#リクエストボディ-4)
      - [レスポンスボディ](#レスポンスボディ-8)
    - [フレンド申請一覧取得 `GET /friends/requests`](#フレンド申請一覧取得-get-friendsrequests)
      - [クエリパラメータ](#クエリパラメータ)
      - [レスポンスボディ](#レスポンスボディ-9)
    - [フレンド申請ステータス更新（承認/拒否） `PATCH /friends/requests/{friendship_id}`](#フレンド申請ステータス更新承認拒否-patch-friendsrequestsfriendship_id)
      - [パスパラメータ](#パスパラメータ-1)
      - [リクエストボディ](#リクエストボディ-5)
      - [レスポンスボディ](#レスポンスボディ-10)
    - [フレンド一覧取得 `GET /friends`](#フレンド一覧取得-get-friends)
      - [クエリパラメータ](#クエリパラメータ-1)
      - [レスポンスボディ](#レスポンスボディ-11)
    - [フレンド解除/申請取り下げ `DELETE /friends/{friendship_id}`](#フレンド解除申請取り下げ-delete-friendsfriendship_id)
      - [パスパラメータ](#パスパラメータ-2)
      - [レスポンスボディ](#レスポンスボディ-12)
  - [ステータス関連処理](#ステータス関連処理)
    - [ユーザーステータス取得 `GET /user-status/{user_id}`](#ユーザーステータス取得-get-user-statususer_id)
      - [パスパラメータ](#パスパラメータ-3)
      - [レスポンスボディ](#レスポンスボディ-13)
    - [ユーザーステータス更新 `PUT /user-status/{user_id}`](#ユーザーステータス更新-put-user-statususer_id)
      - [パスパラメータ](#パスパラメータ-4)
      - [リクエストボディ](#リクエストボディ-6)
      - [レスポンスボディ](#レスポンスボディ-14)
  - [起床宣言関連処理](#起床宣言関連処理)
    - [起床宣言時刻取得 `GET /wakeup-time/{user_id}`](#起床宣言時刻取得-get-wakeup-timeuser_id)
      - [パスパラメータ](#パスパラメータ-5)
      - [レスポンスボディ](#レスポンスボディ-15)
    - [起床宣言時刻登録/更新 `PUT /wakeup-time/{user_id}`](#起床宣言時刻登録更新-put-wakeup-timeuser_id)
      - [パスパラメータ](#パスパラメータ-6)
      - [リクエストボディ](#リクエストボディ-7)
      - [レスポンスボディ](#レスポンスボディ-16)
  - [通知関連処理](#通知関連処理)
    - [通知一覧取得 `GET /notifications`](#通知一覧取得-get-notifications)
      - [クエリパラメータ](#クエリパラメータ-2)
      - [レスポンスボディ](#レスポンスボディ-17)
    - [通知を既読にする `PATCH /notifications/{id}/read`](#通知を既読にする-patch-notificationsidread)
      - [パスパラメータ](#パスパラメータ-7)
      - [レスポンスボディ](#レスポンスボディ-18)
    - [通知を全件既読にする `PATCH /notifications/read-all`](#通知を全件既読にする-patch-notificationsread-all)
      - [リクエストボディ](#リクエストボディ-8)
      - [レスポンスボディ](#レスポンスボディ-19)

# APIエンドポイント

## プレフィクス

すべてのエンドポイントは`/api`から始まります。
例えば、ユーザーの登録処理を行いたい場合は
`POST https://<URL>/api/universal/signup`にリクエストを送信します
また、エンドポイントには`/api`を省略して記載します。

## 認証（JWT）

本APIは、リクエスト時に `Authorization: Bearer <JWT>` による認証を行います。
JWTの発行元は **Auth0** です。

### Auth0発行JWT

- `iss`: `https://<AUTH0_DOMAIN>/`
- `aud`: `AUTH0_AUDIENCE`（Auth0のAPI(Resource Server)のIdentifier）
- `sub`: `subject_id`（例: `auth0|xxxx`）

バックエンドは `https://<AUTH0_DOMAIN>/.well-known/jwks.json` のJWKSで署名検証します。

### 認証が必要なエンドポイント

以下はJWTが必須です（未ログインの場合は `401`）。

- `POST /social/signup`
- `POST /social/login`
- `POST /social/logout`
- `POST /universal/logout`
- `GET /profile/{user_id}`
- `PATCH /profile/edit`
- `POST /user/upload/image`
- `POST /friends/request`
- `GET /friends/requests`
- `PATCH /friends/requests/{friendship_id}`
- `GET /friends`
- `DELETE /friends/{friendship_id}`
- `GET /user-status/{user_id}`
- `PUT /user-status/{user_id}`
- `GET /wakeup-time/{user_id}`
- `PUT /wakeup-time/{user_id}`
- `GET /notifications`
- `PATCH /notifications/{id}/read`
- `PATCH /notifications/read-all`

## 共通レスポンスボディ

共通して使用されるレスポンスボディです。  
また、**少なくともどのAPIエンドポイントでも以下の項目は含みます**

### 成功時

```json
{
  "success": true
}
```

### 失敗時

```json
{
  "success": false,
  "message": "<エラーメッセージ>"
}
```

## ユーザー関連処理

### ユニバーサルサインアップ `POST /universal/signup`

バックエンドがAuth0のROPG(Resource Owner Password Grant)で認証を行い、
Auth0発行のJWTを返します。ユーザー行（`users`）も作成/更新されます。

#### リクエストボディ

```json
{
  "user_id": "<user_id（任意: 未指定ならサーバーで生成）>",
  "email": "<メールアドレス>",
  "password": "<パスワード>",
  "username": "<ユーザー名>"
}
```

#### レスポンスボディ

```json
{
  "success": true,
  "user_id": "<user_id>",
  "access_token": "<Auth0のJWT>",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### ユニバーサールログイン `POST /universal/login`

バックエンドがAuth0のROPGで認証を行い、Auth0発行のJWTを返します。

#### リクエストボディ

```json
{
  "email": "<メールアドレス>",
  "password": "<パスワード>"
}
```

#### レスポンスボディ

```json
{
  "success": true,
  "user_id": "<user_id>",
  "access_token": "<Auth0のJWT>",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### ソーシャルサインアップ `POST /social/signup`

#### リクエストヘッダー

```http
Authorization: Bearer <Auth0のJWT>
```

※ `id_token` ではなく、`aud=AUTH0_AUDIENCE` の `access_token`（JWT）を送ってください。

#### リクエストボディ

```json
{
  "user_id": "<user_id（任意: 未指定ならサーバーで生成）>"
}
```

#### レスポンスボディ

```json
{
  "success": true,
  "user_id": "<user_id>"
}
```

### ソーシャルログイン `POST /social/login`

#### リクエストヘッダー

```http
Authorization: Bearer <Auth0のJWT>
```

※ `id_token` ではなく、`aud=AUTH0_AUDIENCE` の `access_token`（JWT）を送ってください。

#### レスポンスボディ

```json
{
  "success": true,
  "user_id": "<user_id>"
}
```

### ソーシャルログアウト `POST /social/logout`

#### リクエストヘッダー

```http
Authorization: Bearer <Auth0のJWT>
```

#### レスポンスボディ

[共通レスポンスボディ](#共通レスポンスボディ)に準じる

### ユニバーサルログアウト `POST /universal/logout`

#### リクエストヘッダー

```http
Authorization: Bearer <Auth0のJWT>
```

#### レスポンスボディ

[共通レスポンスボディ](#共通レスポンスボディ)に準じる

### プロフィール取得 `GET /profile/{user_id}`

#### パスパラメータ

| パラメータ名 | 型     | 必須 | 説明                                         |
| ------------ | ------ | ---- | -------------------------------------------- |
| user_id      | string |      | 取得するユーザーID。省略時は認証ユーザー自身 |

#### レスポンスボディ

```json
{
  "success": true,
  "user_id": "<user_id>",
  "username": "<ユーザー名>",
  "icon_url": "<アイコンURL>"
}
```

### プロフィール情報登録 `PATCH /profile/edit`

#### リクエストボディ

```json
{
  "user_id": "<一意のユーザー名>",
  "username": "<ユーザー名>"
}
```

### プロフィールアイコン編集 `POST /user/upload/image`

#### リクエストヘッダー

```json
    "Content-Type": "multipart/form-data"
```

#### レスポンスボディ

[共通レスポンスボディ](#共通レスポンスボディ)に準じる

## フレンド関連処理

| エンドポイント名                                                                                                  | 説明                                                 | メソッド | エンドポイント                    |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------- | --------------------------------- |
| [フレンド申請送信](#フレンド申請送信-post-friendsrequest)                                                         | フレンド申請を送信する                               | POST     | /friends/request                  |
| [フレンド申請一覧取得](#フレンド申請一覧取得-get-friendsrequests)                                                 | フレンド申請（申請中）の一覧を取得する               | GET      | /friends/requests                 |
| [フレンド申請ステータス更新（承認/拒否）](#フレンド申請ステータス更新承認拒否-patch-friendsrequestsfriendship_id) | フレンド申請を承認/拒否する                          | PATCH    | /friends/requests/{friendship_id} |
| [フレンド一覧取得](#フレンド一覧取得-get-friends)                                                                 | 承認済みフレンドの一覧を取得する                     | GET      | /friends                          |
| [フレンド解除/申請取り下げ](#フレンド解除申請取り下げ-delete-friendsfriendship_id)                                | フレンド解除、または申請中のフレンド申請を取り下げる | DELETE   | /friends/{friendship_id}          |

### フレンド申請送信 `POST /friends/request`

#### リクエストボディ

```json
{
  "requester_id": "<申請者のuser_id>",
  "friend_id": "<申請先のuser_id>"
}
```

#### レスポンスボディ

```json
{
  "success": true,
  "friendship": {
    "friendship_id": "<friendship_id>",
    "status": "pending"
  }
}
```

### フレンド申請一覧取得 `GET /friends/requests`

#### クエリパラメータ

| パラメータ名 | 型     | 必須 | 説明                                                                 |
| ------------ | ------ | ---- | -------------------------------------------------------------------- |
| user_id      | string | ✅   | 一覧を取得するユーザーの`user_id`                                    |
| type         | string |      | `incoming`（受信）/ `outgoing`（送信）を指定。未指定の場合は両方返す |

#### レスポンスボディ

```json
{
  "success": true,
  "requests": [
    {
      "friendship_id": "<friendship_id>",
      "user_id": "<user_id>",
      "friend_id": "<friend_id>",
      "requester_id": "<requester_id>",
      "status": "pending",
      "created_at": "<ISO8601>"
    }
  ]
}
```

### フレンド申請ステータス更新（承認/拒否） `PATCH /friends/requests/{friendship_id}`

#### パスパラメータ

| パラメータ名  | 型     | 必須 | 説明             |
| ------------- | ------ | ---- | ---------------- |
| friendship_id | string | ✅   | フレンド申請のID |

#### リクエストボディ

```json
{
  "status": "accepted"
}
```

`status`は`accepted`または`rejected`を指定します。

#### レスポンスボディ

```json
{
  "success": true,
  "friendship": {
    "friendship_id": "<friendship_id>",
    "status": "accepted",
    "updated_at": "<ISO8601>"
  }
}
```

### フレンド一覧取得 `GET /friends`

#### クエリパラメータ

| パラメータ名 | 型     | 必須 | 説明                            |
| ------------ | ------ | ---- | ------------------------------- |
| user_id      | string | ✅   | フレンド一覧を取得する`user_id` |

#### レスポンスボディ

```json
{
  "success": true,
  "friends": [
    {
      "friendship_id": "<friendship_id>",
      "user_id": "<user_id>",
      "friend_id": "<friend_id>",
      "status": "accepted",
      "created_at": "<ISO8601>"
    }
  ]
}
```

### フレンド解除/申請取り下げ `DELETE /friends/{friendship_id}`

#### パスパラメータ

| パラメータ名  | 型     | 必須 | 説明                |
| ------------- | ------ | ---- | ------------------- |
| friendship_id | string | ✅   | フレンド関係/申請ID |

#### レスポンスボディ

[共通レスポンスボディ](#共通レスポンスボディ)に準じる

## ステータス関連処理

| エンドポイント名                                                         | 説明                                | メソッド | エンドポイント         |
| ------------------------------------------------------------------------ | ----------------------------------- | -------- | ---------------------- |
| [ユーザーステータス取得](#ユーザーステータス取得-get-user-statususer_id) | ユーザーのステータスを取得する      | GET      | /user-status/{user_id} |
| [ユーザーステータス更新](#ユーザーステータス更新-put-user-statususer_id) | ユーザーのステータスを登録/更新する | PUT      | /user-status/{user_id} |

### ユーザーステータス取得 `GET /user-status/{user_id}`

#### パスパラメータ

| パラメータ名 | 型     | 必須 | 説明       |
| ------------ | ------ | ---- | ---------- |
| user_id      | string | ✅   | ユーザーID |

#### レスポンスボディ

```json
{
  "success": true,
  "user_status": {
    "user_id": "<user_id>",
    "status": "online",
    "updated_at": "<ISO8601>"
  }
}
```

`status`は`online` / `away` / `sleeping`のいずれかです。

### ユーザーステータス更新 `PUT /user-status/{user_id}`

#### パスパラメータ

| パラメータ名 | 型     | 必須 | 説明       |
| ------------ | ------ | ---- | ---------- |
| user_id      | string | ✅   | ユーザーID |

#### リクエストボディ

```json
{
  "status": "sleeping"
}
```

#### レスポンスボディ

[共通レスポンスボディ](#共通レスポンスボディ)に準じる

## 起床宣言関連処理

| エンドポイント名                                                      | 説明                        | メソッド | エンドポイント         |
| --------------------------------------------------------------------- | --------------------------- | -------- | ---------------------- |
| [起床宣言時刻取得](#起床宣言時刻取得-get-wakeup-timeuser_id)          | 起床宣言時刻を取得する      | GET      | /wakeup-time/{user_id} |
| [起床宣言時刻登録/更新](#起床宣言時刻登録更新-put-wakeup-timeuser_id) | 起床宣言時刻を登録/更新する | PUT      | /wakeup-time/{user_id} |

### 起床宣言時刻取得 `GET /wakeup-time/{user_id}`

#### パスパラメータ

| パラメータ名 | 型     | 必須 | 説明       |
| ------------ | ------ | ---- | ---------- |
| user_id      | string | ✅   | ユーザーID |

#### レスポンスボディ

```json
{
  "success": true,
  "wakeup_time": {
    "user_id": "<user_id>",
    "time": "07:30:00"
  }
}
```

### 起床宣言時刻登録/更新 `PUT /wakeup-time/{user_id}`

#### パスパラメータ

| パラメータ名 | 型     | 必須 | 説明       |
| ------------ | ------ | ---- | ---------- |
| user_id      | string | ✅   | ユーザーID |

#### リクエストボディ

```json
{
  "time": "07:30:00"
}
```

#### レスポンスボディ

[共通レスポンスボディ](#共通レスポンスボディ)に準じる

## 通知関連処理

| エンドポイント名                                                          | 説明                               | メソッド | エンドポイント           |
| ------------------------------------------------------------------------- | ---------------------------------- | -------- | ------------------------ |
| [通知一覧取得](#通知一覧取得-get-notifications)                           | 通知一覧を取得する                 | GET      | /notifications           |
| [通知を既読にする](#通知を既読にする-patch-notificationsidread)           | 指定の通知を既読にする             | PATCH    | /notifications/{id}/read |
| [通知を全件既読にする](#通知を全件既読にする-patch-notificationsread-all) | 対象ユーザーの通知を全件既読にする | PATCH    | /notifications/read-all  |

### 通知一覧取得 `GET /notifications`

#### クエリパラメータ

| パラメータ名 | 型     | 必須 | 説明                                   |
| ------------ | ------ | ---- | -------------------------------------- |
| user_id      | string | ✅   | 通知を取得するユーザーの`user_id`      |
| is_read      | bool   |      | `true`/`false`。未指定の場合は全件返す |
| limit        | number |      | 取得件数（例: 50）                     |
| offset       | number |      | オフセット（ページング用）             |

#### レスポンスボディ

```json
{
  "success": true,
  "notifications": [
    {
      "id": "<notification_id>",
      "user_id": "<user_id>",
      "type": "friend_request",
      "payload": {
        "title": "<タイトル>",
        "body": "<本文>"
      },
      "is_read": false,
      "delivered": false,
      "retry_count": 0,
      "created_at": "<ISO8601>"
    }
  ]
}
```

### 通知を既読にする `PATCH /notifications/{id}/read`

#### パスパラメータ

| パラメータ名 | 型     | 必須 | 説明   |
| ------------ | ------ | ---- | ------ |
| id           | string | ✅   | 通知ID |

#### レスポンスボディ

[共通レスポンスボディ](#共通レスポンスボディ)に準じる

### 通知を全件既読にする `PATCH /notifications/read-all`

#### リクエストボディ

```json
{
  "user_id": "<user_id>"
}
```

#### レスポンスボディ

[共通レスポンスボディ](#共通レスポンスボディ)に準じる
