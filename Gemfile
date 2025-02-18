source "https://rubygems.org"

ruby "3.2.2"

gem "rails", "~> 7.1.5", ">= 7.1.5.1"

gem "sqlite3", ">= 1.4"
gem "puma", ">= 5.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[jruby]

gem "bootsnap", require: false
gem "rack-cors", "~> 2.0"

group :development, :test do
  gem "debug", platforms: %i[mri]

  group :development do
    # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
    # gem "spring"
  end
end
