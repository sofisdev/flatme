const { Schema, model, Mongoose } = require("mongoose");

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
  zipcode:{
    type: String,
    required:true
  },
  dateRegister:{
    type: Date,
    default: Date.now,
    required: true
  },
  city: {
    type: String,
    required:true
  },
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
  published: {
    type:Boolean,
    required:true,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }
});


const Comment = model("comment", CommentSchema);

module.exports = Comment;