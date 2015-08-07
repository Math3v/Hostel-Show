require 'test_helper'

class LocationsGuardTest < ActionDispatch::IntegrationTest
  setup do
    post '/users/sign_in', 'user[email]': 'example1@example.org', 'user[password]': 'secret12'
  end

  test "user cannot access locations new" do
  	get '/locations/new'
  	assert_response :missing
  end
end
