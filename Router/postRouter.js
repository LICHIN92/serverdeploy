import express from 'express'
import { addPost, getPost, updatePost, deletePost, getImageById, getDetail } from '../controllers/postController.js'
import { upload } from '../upload.js'
import passport from '../passport.js'
const postRouter = express.Router()

postRouter.post('/', passport.authenticate('jwt', { session: false }),
                       upload.single('image'), addPost);
// postRouter.post('/',upload.single('image'),addPost)

postRouter.get('/', getPost)
postRouter.patch('/:postId', updatePost)
postRouter.delete('/:postId', deletePost)
postRouter.get('/images/:id', getImageById)
postRouter.get('/getdetail/:postId', getDetail)

export default postRouter