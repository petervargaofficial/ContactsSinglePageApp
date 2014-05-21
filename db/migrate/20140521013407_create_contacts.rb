class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :contact_name
      t.string :contact_email
      t.string :contact_telephone
      t.string :contact_img_url

      t.timestamps
    end
  end
end
