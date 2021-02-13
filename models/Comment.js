const { Schema, model, Mongoose } = require("mongoose");
const geocoder = require('../utils/geocoder')
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const CommentSchema = new Schema({
  idGeo: { //Geocoder will transform our address into these properties
    type: {
      type: String, 
      enum: ['Point'], //GeoJSON point
    },
    coordinates: {
      type: [Number],
      required: '2dsphere'
    },
    formattedAddress: String
  },
  address: {
    type: String,
    required:true
  },
  dateRegister:{
    type: Date,
    default: Date.now,
    required: true
  },
  // country: {
  //   type: String,
  //   required:true
  // },
  // city: {
  //   type: String,
  //   required:true
  // },
  // district: {
  //   type: String,
  //   required:true
  // },
  // street: {
  //   type: String,
  //   required:true
  // },
  title: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  picture: String,
  score: {
    type:Number,
    enum: [1,2,3,4,5],
    required: true
  },
  tags:{
    type:String,
    enum: ['Family', 'Gay-friendly', 'Students']
  },
  marker: {
    type:String,
    default:"../public/images/favicon.ico",
    required:true
  },

  status: {
    type:String,
    required:true,
    enum:['draft', 'published'],
    default: 'draft'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }
});

// Geocode and create location before saving into database (pre())
// CommentSchema.pre('save', async (next) => {
//   const loc = await geocoder.geocode(this.address)
//   this.idGeo = {
//     type: 'Point',
//     coordinates: [loc[0].longitude, loc[0].latitude],
//     formattedAddress: loc[0].formattedAddress
//   }
// })

const Comment = model("comment", CommentSchema);

module.exports = Comment;