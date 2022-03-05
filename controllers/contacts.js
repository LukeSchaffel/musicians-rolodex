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

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.willingToTravel = !!req.body.willingToTravel
  req.body.teaches = !!req.body.teaches
  Contact.create(req.body)
  .then(contact => {
    res.redirect('/contacts')
  })
  .catch(err => {
  console.log(err)
  res.redirect("/contacts")
  })
}

export {
  index,
  newContact as new,
  create
}