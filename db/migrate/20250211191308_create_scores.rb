class CreateScores < ActiveRecord::Migration[7.1]
  def change
    create_table :scores do |t|
      t.string :player_name
      t.integer :time
      t.integer :image_id

      t.timestamps
    end
  end
end
