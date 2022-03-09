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
  Instrument.find({})
  .then(instruments => {
    res.render("contacts/new", {
      title: "New Contact",
      instruments
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/contacts")
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

function edit(req, res) {
  Contact.findById(req.params.id)
  .then(contact => {
    Instrument.find({})
    .then(instruments => res.render('contacts/edit', {
      contact,
      title: "Edit Contact",
      instruments
    }))  
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  }) 
}

function update(req, res) {
  Contact.findById(req.params.id)
  .populate("owner")
  .then(contact => {
    console.log(req.user.profile._id);
    // if (contact.body.owner.equals(req.user.profile._id)) {
      req.body.willingToTravel = !!req.body.willingToTravel
      req.body.teaches = !!req.body.teaches
      contact.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect(`/contacts/${req.params.id}`)
      })
    // } else {
    //   }  throw new Error("NOT AUTHORIZED")
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect("/contacts")
    })
  }

function deleteNote(req, res) {
  Contact.findById(req.params.contactId)
  .then(contact=>{
    contact.notes.remove({_id: req.params.noteId})
    contact.save()
    .then(()=>{
      res.redirect(`/contacts/${req.params.contactId}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/contacts/${req.params.contactId}`)
  })
}  

function editNote (req, res) {
  Contact.findById(req.params.contactId)
  .then(contact => {
    const myNote = contact.notes.filter(note => {
     return note._id.toString() === req.params.noteId
    })
      res.render('contacts/edit-note', {
        contact,
        title: "Edit Note",
        note: myNote[0]
      })
    })   
  }
 
  function updateNote(req, res) {
    Contact.findById(req.params.contactId)
    .then(contact => {
      console.log(req.body.content);
      contact.notes.id(req.params.noteId).content = req.body.content
      contact.save()
      .then(() => {
        res.redirect(`/contacts/${req.params.contactId}`)
      })    
    })
    
  }



// function updateNote(req, res) {
//   Contact.findById(req.params.contactId)
//   .then(contact => {
//     contact.notes.id(req.params.noteId).updateOne(req.body, {new: true})
//     contact.save()    
//   })
//   .then(() => {
//     res.redirect('/')
//   })
// }



// const myNote = contact.notes.filter(note => {
//   return note._id.toString() === req.params.noteId
//  })

export {
  index,
  newContact as new,
  create,
  show,
  addNewNote,
  deleteContact as delete,
  edit,
  update,
  deleteNote,
  editNote,
  updateNote
}