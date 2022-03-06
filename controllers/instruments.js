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


export {
  newInstrument as new

}