require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get compose" do
    get :compose
    assert_response :success
  end

end
