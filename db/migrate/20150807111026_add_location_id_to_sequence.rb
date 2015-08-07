class AddLocationIdToSequence < ActiveRecord::Migration
  def change
  	add_column :sequences, :location_id, :integer
  end
end
