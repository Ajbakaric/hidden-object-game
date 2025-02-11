class Score < ApplicationRecord
    validates :player_name, presence: true
    validates :time, presence: true
  end
  