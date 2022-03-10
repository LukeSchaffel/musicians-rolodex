import mongoose from 'mongoose'

const Schema = mongoose.Schema

const instrumentSchema = new Schema({
  name: String,
  creator: { type: Schema.Types.ObjectId, ref: "Profile" }
}, 
)

const Instrument = mongoose.model('Instrument', instrumentSchema)

export {
  Instrument
}