import mongoose from "mongoose";

// async function main() {
//   await mongoose.connect('mongodb+srv://lichinc1992:r8Ity1wjKtyT9CD1@cluster0.toj3yfo.mongodb.net/');

//  console.log('Connected to MongoDB');
// }
// main().then(res=>console.log('conected to db')).catch(err => console.log(err));

const employeeSchema = new mongoose.Schema({
    name: String,
    age:Number,
   rank:String
  });
  const Employee = mongoose.model('employee', employeeSchema,"employee");
  export default Employee
