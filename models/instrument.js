import mongoose from 'mongoose'

const Schema = mongoose.Schema

const instrumentSchema = new Schema({
  name: String
}, 
)

const Instrument = mongoose.model('Instrument', instrumentSchema)

export {
  Instrument
}