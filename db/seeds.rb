# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Location.find_or_create_by({name: 'Brno', floors: 10, per_floor: 9, state_acronym: 'CZ'})
Location.find_or_create_by({name: 'Praha', floors: 13, per_floor: 10, state_acronym: 'CZ'})
Location.find_or_create_by({name: 'Ostrava', floors: 12, per_floor: 15, state_acronym: 'CZ'})

admin = User.find_by({email: 'admin@hostelshow.com', admin: true})
if admin.nil?
	User.create({email: 'admin@hostelshow.com', password: 'Secret12', password_confirmation: 'Secret12', admin: true})
end