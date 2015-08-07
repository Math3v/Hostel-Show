class Location < ActiveRecord::Base
	has_many :sequences

	validates :name, :floors, :per_floor, presence: true
end
