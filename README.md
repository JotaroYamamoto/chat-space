# README
 
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null:false|
|email|string|null:false|

### Association
has_many :messages
has_many :groups, through: :groups_users
has_many :groups_users
add_index :users, : name,uniquie:true
add_index :users,:email,unique:true

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null:false|

### Association
has_many :masseges
has_many :users, through: :groups_users
has_many :groups_users

## massagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null:false,foreign_key:true,index:true|
|user_id|integer|null:false,foreign_key:true,index:true|

### Association
belongs_to :user
belongs_to :group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
