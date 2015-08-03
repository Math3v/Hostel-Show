module ApplicationHelper
	def twitterized_type(type)
	  case type.to_s
	    when "alert"
	      "block"
	    when "error"
	      "error"
	    when "notice"
	      "info"
	    when "success"
	      "success"
	    else
	      type.to_s
	  end
	end
end
