class ObjectsController < ApplicationController
    def validate_click
      object = GameObject.find_by(name: params[:name])
  
      if object
        Rails.logger.info "✅ Checking #{params[:name]}"
        Rails.logger.info "👉 Clicked Position: x=#{params[:x].to_f}, y=#{params[:y].to_f}"
        Rails.logger.info "🎯 Expected Position: x=#{object.x}, y=#{object.y}"
      else
        Rails.logger.info "❌ Object not found: #{params[:name]}"
      end
  
      if object && distance(params[:x].to_f, params[:y].to_f, object.x, object.y) < 5.0
        Rails.logger.info "🎉 Success! #{params[:name]} found!"
        render json: { success: true, message: "Correct!" }
      else
        Rails.logger.info "🚨 Incorrect selection!"
        render json: { success: false, message: "Try again!" }
      end
    end
  
    private
  
    def distance(x1, y1, x2, y2)
      Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
    end
  end
  