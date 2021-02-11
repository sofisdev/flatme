const { Schema, model, Mongoose } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const CommentSchema = new Schema({
  idGeo: {
    type: String,
    required: true
  },
  message: {
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
  marker: String,
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Comment = model("comment", CommentSchema);

module.exports = Comment;