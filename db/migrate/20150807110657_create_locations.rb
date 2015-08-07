class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :street
      t.string :town
      t.string :state_acronym
      t.decimal :floors, null: false
      t.decimal :per_floor, null: false

      t.timestamps null: false
    end
  end
end
