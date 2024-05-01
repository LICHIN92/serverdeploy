import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
  image: String,
  title: String,
  subtitle: String,
  desc: String,
  createdBy: { 
    type: mongoose.Types.ObjectId,
    ref: 'Userr' 
  }
});
const post = mongoose.model('post', postSchema, "post");
export default post
