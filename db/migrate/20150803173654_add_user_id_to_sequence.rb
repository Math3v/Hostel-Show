class AddUserIdToSequence < ActiveRecord::Migration
  def change
    add_column :sequences, :user_id, :integer
    add_index :sequences, :user_id
  end
end
