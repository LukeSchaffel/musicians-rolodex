import { Instrument } from "../models/instrument.js";

function newInstrument(req, res) {
  Instrument.find({})
  .then(instruments => {
    res.render('instruments/new', {
      title: "Add Instrument",
      instruments
    })
  })
}

function create(req, res) {
  Instrument.create(req.body)
  .then(res.redirect('/instruments/new'))
}


export {
  newInstrument as new,
  create

}