import { Instrument } from "../models/instrument.js";

function newInstrument(req, res) {
  Instrument.find({})
  .populate("creator")
  .then(instruments => {
    res.render('instruments/new', {
      title: "Add Instrument",
      instruments
    })
  })
}

function create(req, res) {
  req.body.creator = req.user.profile._id
  Instrument.create(req.body)
  .then(res.redirect('/instruments/new'))
}

function deleteInstrument(req, res) {
  Instrument.findByIdAndDelete(req.params.id)
  .then(instrument => {
    res.redirect("/instruments/new")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/instruments/new")
  })

}


export {
  newInstrument as new,
  create,
  deleteInstrument as delete

}