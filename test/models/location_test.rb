require 'test_helper'

class LocationTest < ActiveSupport::TestCase
  
  test "validates name presence" do
    location = Location.create(floors: 5, per_floor: 3)
    assert_not location.save
  end

  test "validates floors presence" do
    location = Location.create(name: 'Location', per_floor: 3)
    assert_not location.save
  end

  test "validates per_floor presence" do
    location = Location.create(name: 'Location', floors: 5)
    assert_not location.save
  end

  test "validates valid location save" do
  	location = Location.create(name: 'Location', floors: 3, per_floor: 2)
  	assert location.save
  end
end
