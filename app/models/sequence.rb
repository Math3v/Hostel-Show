class Sequence < ActiveRecord::Base
	has_many :ratings

	belongs_to :user
	belongs_to :location	

	validates :title, presence: true
end
