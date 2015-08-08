FactoryGirl.define do
  factory :user do
    id 1
    email 'example@example.org'
    password 'secret12'
    password_confirmation 'secret12'
    admin false
  end

  factory :admin, class: User do
    id 2
    email 'admin@hostelshow.com'
    password 'secret12'
    password_confirmation 'secret12'
    admin true
  end
end