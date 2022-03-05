import mongoose from 'mongoose'

const Schema = mongoose.Schema


const noteSchema = new Schema({
  content: String
})

const contactSchema = new Schema({
  name: String,
  email: String,
  phoneNum: String,
  instruments: [{type: Schema.Types.ObjectId, ref: "Instrument"}],
  location: String,
  willingToTravel: Boolean,
  teaches: Boolean,
  notes: [noteSchema],
  owner: { type: Schema.Types.ObjectId, ref: "Profile" }
}, {
  timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema)

export {
  Contact
}