import { Contact } from "../models/contact.js"



function index(req, res) {
 
  // console.log(req.user.profile);
  Contact.find({})

  //if the contacts owner matches the user, show it?
  .then(contacts => {
    res.render('contacts/index', {
      contacts,
      user: req.user.profile,
      title: "Contacts List"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/contacts`)
  })
}


function newContact(req, res) {
  res.render("contacts/new", {
    title: "New Contact"
  })
}

export {
  index,
  newContact as new
}