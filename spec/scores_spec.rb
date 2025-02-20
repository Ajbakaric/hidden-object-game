require 'rails_helper'

RSpec.describe "Scores API", type: :request do
  describe "GET /scores" do
    it "returns a list of scores" do
      Score.create(player_name: "Alice", time: 120)

      get "/scores"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).length).to eq(1)
    end
  end

  describe "POST /scores" do
    it "creates a new score" do
      post "/scores", params: { player_name: "Bob", time: 95 }

      expect(response).to have_http_status(:ok)
      expect(Score.count).to eq(1)
    end
  end
end
