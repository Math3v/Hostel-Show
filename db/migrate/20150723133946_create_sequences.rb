class CreateSequences < ActiveRecord::Migration
  def change
    create_table :sequences do |t|
      t.string :title
      t.text :description
      t.text :data

      t.timestamps null: false
    end
    add_index :sequences, :title, unique: true
  end
end
