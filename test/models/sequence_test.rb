require 'test_helper'

class SequenceTest < ActiveSupport::TestCase

  test "average rating should return valid rating" do
  	sequence = Sequence.create(title: 'Title', description: 'Description')
		rating_1 = Rating.create(sequence_id: sequence.id, score: 3)
		rating_2 = Rating.create(sequence_id: sequence.id, score: 4)
    
    avg_rating = sequence.average_rating
    assert avg_rating == 3.5
  end

  test "validates title presence" do
  	sequence = Sequence.create(title: "")
  	assert_not sequence.save
  end
end
