import express from 'express';
import cors from 'cors'
import userRouter from './Router/userRouter.js';
import employeeRuter from './Router/employee.js';
import postRouter from './Router/postRouter.js';
import path from 'path'
import mongoose from 'mongoose';
import 'dotenv/config'
const app = express();

async function main() {
    console.log(process.env.MONGODB_URL);
    // await mongoose.connect('mongodb+srv://lichinc1992:r8Ity1wjKtyT9CD1@cluster0.toj3yfo.mongodb.net/');
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Connected to MongoDB');
  }
  main().then(res => console.log('conected to db')).catch(err => console.log(err));
  
const dirname=path.resolve()
app.use(express.static(path.join(dirname,'uploads')))

app.use(cors('http://localhost:5173'));
app.use(express.json());
app.use('/',userRouter)
app.use('/employee',employeeRuter)
app.use('/post',postRouter)



const PORT=process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`running at port  ${PORT}`);
});
