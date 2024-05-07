import post from "../Models/postmodal.js";
import path from 'path'
import fs from 'fs'
const addPost = async (req, res) => {
    console.log(req.body);
    // console.log(req.files[0]);//multiple file
    console.log(req.file);//multiple file

    //    let pic=req.files.map((file)=>{  return { name: file.filename, type: file.mimetype }})  
    //     console.log(pic);
    try {
        let postItem = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            desc: req.body.desc,
            image: req.file.filename  //single file
            // image:req.files.map(file=>file.filename)
        }
        let Post = new post(postItem)
        await Post.save();
        res.status(200).json(postItem)
    } catch (error) {
        res.status(500).json({ err: 'error' })
        console.log(error);

    }
}

const getPost = async (req, res) => {
    console.log('getpost');
    try {
        const postDetail = await post.find({})
        res.status(200).json(postDetail)
        console.log(postDetail);
    console.log('getpost');
        
    } catch (error) {
        console.log(error);
        res.json(500).json({ error: 'intenal error' })

    }
}
const updatePost = async (req, res) => {
    console.log(req.params);
    try {
        const postItem = await post.findByIdAndUpdate(req.params.postId, req.body, { new: true })
        res.status(200).json(postItem)
    } catch (error) {
        console.log(error);
        res.json(500).json({ error: 'intenal error' })
    }
}

const deletePost = async (req, res) => {
    try {
        const delet = await post.findByIdAndDelete(req.params.postId);
        res.status(200).json('deleted')
    } catch (error) {
        console.log(error);
        res.json(500).json({ error: 'intenal error' })
    }
}

const getImageById = async (req, res) => {
    console.log(req.params.id);
    try {
        const id = req.params.id
        const postitem = await post.findById(id).exec()
        if (!postitem) {
            return res.status(404).json('image is not found')
        }
        console.log(postitem);
        const dirname=path.resolve()
        const imagePath=path.join(dirname,'uploads',postitem.image)
        console.log(imagePath);
        if(!fs.existsSync(imagePath)){
            return res.status(404).json({error:"image file not found"})
        }
        res.sendFile(imagePath)
    } catch (error) {
        console.log(error);
        res.json(500).json({ error: 'intenal error' })
    }
}
const getDetail=(req,res)=>{
console.log(req.params);
}
export { addPost, getPost, updatePost, deletePost, getImageById,getDetail }
