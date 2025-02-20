require 'rails_helper'

RSpec.describe "Objects API", type: :request do
  let!(:game_object) { GameObject.create(name: "Frog", x: 50, y: 30) }

  describe "POST /validate_click" do
    it "returns success if object is found at correct coordinates" do
      post "/validate_click", params: { name: "Frog", x: 50, y: 30 }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["success"]).to eq(true)
    end

    it "returns failure if object is at wrong coordinates" do
      post "/validate_click", params: { name: "Frog", x: 10, y: 10 }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["success"]).to eq(false)
    end

    it "returns failure if object does not exist" do
      post "/validate_click", params: { name: "Dragon", x: 50, y: 30 }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["success"]).to eq(false)
    end
  end
end
