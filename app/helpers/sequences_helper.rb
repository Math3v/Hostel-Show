module SequencesHelper
	def can_modify?
		user_signed_in? && ((current_user.id == @sequence.user_id) || current_user.admin?)
	end

	def floors
		@sequence.location.floors.to_i
	end

	def per_floor
		@sequence.location.per_floor.to_i
	end

	def get_index i, j
		(i * 10) + (j + 1)
	end

	def options_for_locations
		@locations.map{ |c| 
			[c.name, c.id] 
		}
	end
end
