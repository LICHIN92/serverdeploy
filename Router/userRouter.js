import express from 'express'
import { getUsers,getUserByName,adduser,updateUser,updateUserput,deleteuser,Login } from '../controllers/userController.js'
const userRouter=express.Router()

userRouter.get('/',getUsers)
userRouter.post('/',adduser)
userRouter.post('/login',Login)
userRouter.get('/username/:username',getUserByName)
userRouter.patch("/:id",updateUser)
userRouter.put("/:id",updateUserput)
userRouter.delete('/:id',deleteuser)



export default userRouter