
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const songSchema = new Schema({
    values: [{
    imglink: {
      type: String, required: true
    },
    id: {
      type: String, required: true, unique: true
    },
    spotify: String,
    soundCloud: String,
    youtube: String,
    appleMusic: String,
    }
  ],
}, {
    timestamps: true,
})

songSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject.__v
      delete returnedObject.createdAt
      delete returnedObject.updatedAt
      delete returnedObject._id
    }
  })

const Song = mongoose.model('Song', songSchema)
module.exports = Song