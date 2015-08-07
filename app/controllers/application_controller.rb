class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def authenticate_user_or_admin
    if user_signed_in? && current_user.admin?
      true
    else
      authenticate_user!
    end
  end

  def render_404
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404.html", status: 404 }
      format.all  { render nothing: true, status: 404 }
    end
  end
end
