import mongoose from 'mongoose'

const Schema = mongoose.Schema


const noteSchema = new Schema({
  content: String
})

const contactSchema = new Schema({
  name: String,
  email: String,
  phoneNum: String,
  instruments: [{type: Schema.Types.Object, ref: "Instrument"}],
  location: String,
  willingToTravel: Boolean,
  teaches: Boolean,
  notes: [noteSchema]
}, {
  timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema)

export {
  Contact
}