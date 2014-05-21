class ContactsController < ApplicationController

  def main
  end


  def index
    @contacts = Contact.all
    respond_to do |f|
      f.json { render :json => @contacts}
    end
  end

end
