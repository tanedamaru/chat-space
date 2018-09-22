class MessagesController < ApplicationController

  def index
    @current_user= current_user
    @group = Group.find(params[:group_id])
  end

  def create
  end

  private

  def message_params
    params[:group_id]
  end

end
