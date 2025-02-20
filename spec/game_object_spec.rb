require 'rails_helper'

RSpec.describe GameObject, type: :model do
  it "is valid with a name and coordinates" do
    object = GameObject.new(name: "Frog", x: 50, y: 30)
    expect(object).to be_valid
  end

  it "is invalid without a name" do
    object = GameObject.new(x: 50, y: 30)
    expect(object).not_to be_valid
  end

  it "is invalid without coordinates" do
    object = GameObject.new(name: "Frog")
    expect(object).not_to be_valid
  end
end
