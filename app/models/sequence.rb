class Sequence < ActiveRecord::Base
	has_many :ratings

	belongs_to :user
	belongs_to :location	

	validates :title, presence: true

	def average_rating
		if ratings.count > 0
			ratings.sum(:score) / ratings.count.to_f
		else
			0
		end
	end
end
