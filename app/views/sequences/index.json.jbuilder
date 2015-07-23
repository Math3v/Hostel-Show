json.array!(@sequences) do |sequence|
  json.extract! sequence, :id, :title, :description, :data
  json.url sequence_url(sequence, format: :json)
end
