class ScoresController < ApplicationController
    def index
      scores = Score.order(:time).limit(10)
      render json: scores
    end
  
    def create
      score = Score.create(player_name: params[:player_name], time: params[:time], image_id: params[:image_id])
      render json: score
    end
  end
  