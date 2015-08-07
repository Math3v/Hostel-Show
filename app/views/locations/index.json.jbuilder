json.array!(@locations) do |location|
  json.extract! location, :id, :name, :street, :town, :state_acronym, :floors, :per_floor
  json.url location_url(location, format: :json)
end
