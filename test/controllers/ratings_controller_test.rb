require 'test_helper'

class RatingsControllerTest < ActionController::TestCase
	setup do
		@sequence = FactoryGirl.create(:sequence)
		@user = FactoryGirl.create(:user)
		@rating = FactoryGirl.create(:rating)
	end

  test "should update rating" do
    patch :update, id: @rating
    assert_response :success
  end

end
