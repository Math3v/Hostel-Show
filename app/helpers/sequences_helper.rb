module SequencesHelper
	def can_modify?
		user_signed_in? && (current_user.id == @sequence.user_id)
	end
end
