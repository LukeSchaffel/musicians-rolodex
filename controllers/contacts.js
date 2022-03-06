import { Contact } from "../models/contact.js"
import { Instrument } from "../models/instrument.js"



function index(req, res) {
 
  // console.log(req.user.profile);
  Contact.find({owner: req.user.profile._id})
  .populate("owner")
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

function show(req,res) {
  Contact.findById(req.params.id)
  // .populate('instruments')
  .then (contact => {
    res.render('contacts/show',{
      contact,
      title: contact.name
    })
  })
}

function addNewNote(req, res) {
  Contact.findById(req.params.id)
  .then(contact =>{
    contact.notes.push(req.body)
    contact.save()
    .then(()=>{
      res.redirect(`/contacts/${contact._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/contacts/${contact._id}`)
    })
  })
}

function deleteContact(req, res) {
  Contact.findByIdAndDelete(req.params.id)
  .then(contact => {
    res.redirect("/contacts")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/contacts")
  })
}

export {
  index,
  newContact as new,
  create,
  show,
  addNewNote,
  deleteContact as delete
}