require 'test_helper'

class KillerFeaturesTest < ActionDispatch::IntegrationTest

	#TODO: User rates sequences

	test "sign as admin and browse application" do
		log_in_user users(:admin)

		get '/locations'
		assert_response :success
		assert assigns(:locations)

		get "/sequences/#{sequences(:one).id}"
		assert_response :success
		assert_select '.btn-danger' do |elements|
			assert_equal elements.count, 2
		end
	end

  test "sign in and browse the application" do
    log_in_user users(:one)

    get '/sequences'
    assert_response :success
    assert assigns(:sequences)

    get "/sequences?user_id=#{users(:one).id}"
    assert_response :success
    assert assigns(:sequences)

    get "/sequences/#{sequences(:one).id}"
    assert_response :success
    assert_select 'h1', sequences(:one).title
    assert_select '.hostel-win' do |elements|
    	assert elements.count == locations(:one).floors * locations(:one).per_floor
    end

    get "/sequences/#{sequences(:one).id}/edit"
    assert_response :success
    assert_select '.hostel-win' do |elements|
    	assert elements.count == locations(:one).floors * locations(:one).per_floor
    end
  end

  private

  	def log_in_user user
  		get '/users/sign_in'
			assert_response :success

			post_via_redirect '/users/sign_in', 'user[email]': user.email, 'user[password]': 'secret12'
			assert_equal '/', path
  	end
end
