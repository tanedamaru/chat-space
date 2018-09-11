## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|email|string|null: false, unique: true|
|encrypted_password|string|null: false|

### Association
- has_many :groups, :through => :members
- has_many :messages
- has_many :members
