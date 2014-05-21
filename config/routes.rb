ContactsSinglePageApp::Application.routes.draw do
  root 'contacts#main'
  get '/index', to: 'contacts#index'
end
