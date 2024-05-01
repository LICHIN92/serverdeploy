import mongoose from "mongoose";

// async function main() {
//   // await mongoose.connect('mongodb+srv://lichinc1992:Psoa6fiGJAV1mj6P@cluster0.d45heoi.mongodb.net/new');
//   await mongoose.connect('mongodb+srv://lichinc1992:r8Ity1wjKtyT9CD1@cluster0.toj3yfo.mongodb.net/');

//  console.log('Connected to MongoDB');
// }
// main().then(res=>console.log('conected to db')).catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    username:String,
    email:String,
    password:String,
    createdAt:Date
  });
  const Userr = mongoose.model('user', userSchema,"user");
  export default Userr
