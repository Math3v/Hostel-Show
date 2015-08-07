module LocationsHelper
	def name_and_state location
		name = location.name
		state = location.state_acronym
		if state
			return location.name + ", " + state
		else
			return location.name
		end
	end
end
