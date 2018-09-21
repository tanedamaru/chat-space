class Group < ApplicationRecord
  has_many  :gropu_users
  has_many  :users, through: :gropu_users
  validates :name, presence: true
end
