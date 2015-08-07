FactoryGirl.define do
  factory :user do
    email 'example@example.org'
    password 'secret12'
    password_confirmation 'secret12'
    admin false
  end

  factory :admin, class: User do
    email 'admin@hostelshow.com'
    password 'secret12'
    password_confirmation 'secret12'
    admin      true
  end
end