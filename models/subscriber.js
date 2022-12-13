const mongoose = require('mongoose') // create the model

// creating the schema
const subscribersSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  numberOfViews:{
    type: Integer,
    required: false
  }

  subscribedToChannel: {
    type: String,
    required: true
  },
  subscribeDate:{
    type: Date,
    required: true,
    default: Date.now

  }
})


module.exports = mongoose.model('Subscriber', subscribersSchema)

// model = export and import to a different filesß
