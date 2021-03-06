// Waiting for the DOM to finish loading
$(document).ready(function() {


    var contacts = [];
    var count = 0;


    var deleteContact = function(event) {
        console.log("Delete", this);
        $(this).parents(".contact").remove();
    };

    $("#contacts").on("click", ".delete", deleteContact);

    // $("#contacts").on("click", ".contact-item", function() {  
    // });
    $("#contacts").on("focusout", ".contact-item", function() {
        // console.log(this.id);
        // console.log(this.parentElement.id);
        // console.log($(this).html());
        // console.log(contacts[this.parentElement.id][this.id]);
        contacts[this.parentElement.id][this.id] = $(this).html();
    });


    $.get('/index.json').done(function(data) {
        $.each(data, function(index, item) {
            var newContact = {
                id: count,
                name: item.contact_name,
                email: item.contact_email,
                number: item.contact_telephone,
                imgUrl: item.contact_img_url
            };
            count += 1;
            contacts.push(newContact);
            addContact(newContact);
        });
    });

    var addContact = function(newContact) {
        var contactString = ["<div id='", newContact.id, "' class='contact' >",
            "<div>",
            "<img src='", newContact.imgUrl, "' class='contact-img'>",
            "</div>",
            "<div class='contact-item' id='name' contenteditable='true'>", newContact.name, "</div>",
            "<div class='contact-item' id='email' contenteditable='true'>", newContact.email, "</div>",
            "<div class='contact-item' id='number' contenteditable='true'>", newContact.number, "</div>",

            "<div class='contact-actions'>",

            "<span class='delete btn btn-action'>Delete</span>", " ",
            "<span class='edit btn btn-action'>Edit</span>",
            "</div>",
            "</div>"
        ].join("");

        console.log(contactString);

        $("#contacts").append(contactString);

    };

    // Now we need to watch for a submit 
    //  event on the form
    $("#new_contact").submit(function(event) {
        // Prevent the page from reloading
        event.preventDefault();

        //console.log(this);

        var name = $("#contact_name").val();
        var email = $("#contact_email").val();
        var number = $("#contact_number").val();
        var imgUrl = $("#contact_img_url").val();

        console.log(name, email, number, imgUrl);

        // Reset the form
        this.reset();


        // Keeping track of new contacts
        var newContact = {
            id: count,
            name: name,
            email: email,
            number: number,
            imgUrl: imgUrl
        };
        count += 1;


        contacts.push(newContact);

        // Call a function to add our contact to 
        //  the page.
        addContact(newContact);

    });
});