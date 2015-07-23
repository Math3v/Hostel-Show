class Sequence < ActiveRecord::Base
	#serialize :data
	validates :title, presence: true
end
