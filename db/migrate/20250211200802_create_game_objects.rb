class CreateGameObjects < ActiveRecord::Migration[7.1]
  def change
    create_table :game_objects do |t|
      t.string :name
      t.integer :x
      t.integer :y
      t.integer :image_id

      t.timestamps
    end
  end
end
