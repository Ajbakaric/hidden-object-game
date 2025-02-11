Rails.application.routes.draw do
  resources :scores, only: [:index, :create]
  post '/validate_click', to: 'objects#validate_click'
end
