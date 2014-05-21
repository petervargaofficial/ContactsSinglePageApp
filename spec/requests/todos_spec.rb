require 'spec_helper'

describe '/index api' do

  before (:each) do
    @contacts = Contact.create!({contact_name: 'Luke' , contact_email: 'luke@galaxy.com',
                                 contact_telephone: '111-111-1111', contact_img_url: 'http://fc08.deviantart.net/fs71/f/2010/153/e/8/Luke_Skywalker_by_Aliora.jpg'})
  end

  describe 'GET with JSON' do
    before (:each) do
      get '/index.json'
      @result = JSON.parse(response.body)
    end

    it "should return response code 200" do
      response.response_code.should == 200
    end


    it 'returns all contact items' do
      @result.should_not be_nil
      @result.should have(1).contacts
    end


    it 'should have the correct data in the todos' do
      @result.find do |todo|
        todo["contact_name"] == "Luke"
      end.should_not be_nil
    end
  end
end
