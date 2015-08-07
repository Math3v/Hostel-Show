class Sequence < ActiveRecord::Base
	belongs_to :user
	belongs_to :location	
	validates :title, presence: true
end
