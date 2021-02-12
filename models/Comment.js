const { Schema, model, Mongoose } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const CommentSchema = new Schema({
  idGeo: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required:true
  },
  city: {
    type: String,
    required:true
  },
  District: {
    type: String,
    required:true
  },
  Street: {
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
    enum: ['Family', 'Gay-friendly', 'Students'],
    required: true
  },
  marker: {
    type:String,
    default:"../public/images/favicon.ico",
    required:true
  },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});

const Comment = model("comment", CommentSchema);

module.exports = Comment;