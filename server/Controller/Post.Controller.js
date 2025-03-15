const Post = require("../Models/Post")
const AddPost = async (req, res)=>{
    const {title, rating, time, starring, genres} = req.body;
    try {
        if (!title || !rating || !time || !starring || !genres) {
            return res.status(401).json({message : "All Fields are Required"})
        }

        const coverImagePath = req.files?.coverImage[0].filename;
        const VideoPath = req.files?.video[0].filename;

        if (!coverImagePath) {
            return res.status(400).json({message : "Cover Image Path Required."})
        }

            const addpost = await Post.create({
                title : title,
                rating : rating,
                time : time,
                starring : starring,
                genres : genres,
                coverImage : coverImagePath,
                video : VideoPath

            })
            return res.status(200).json({message : "Post Added Successfully", addpost})
    } catch (error) {
        return res.status(400).json({message : "Goat Some Errors", error})   
    }
}

const getAllDisorder = async (req, res)=>{
    try {
        const get = await Post.find({}).sort({createdAt : -1})
        return res.status(200).json({message : "All Disorder Post Fetch it.", get})
    } catch (error) {
        return res.status(400).json({message : "Goat Some Errors", error})   
    }
}

const SingleData = async (req, res)=>{
    const {id} = req.params;
    try {
        if (id) {
            const getsingl = await Post.findById(id);
        return res.status(200).json({message : "Single Blog Geted.", getsingl})
        }else{
        return res.status(400).json({message : "Invalid ID"})
        }
    } catch (error) {
        return res.status(400).json({message : error.message})
    }
 }

const SearchPost = async (req, res)=>{
    try {
        const Searchit = await Post.find({
            "$or" : [
                {title : {$regex : req.params.key}}
            ]
        });
        if (Searchit) {
            return res.status(200).json({message : "All Image Fetch it", Searchit})
        }
        } catch (error) {
            return res.status(400).json({message : error.message})
        }
}

const DeletePost = async (req, res)=>{
    try {
        const userID = req.params.id;
        const user = await Post.findByIdAndDelete(userID)
        return res.status(200).json({message : "Post Deleted Successfully", user})
    } catch (error) {
        return res.status(400).json({message : "Goat Some Errors", error})   
    }
}

module.exports = {AddPost, DeletePost, getAllDisorder, SearchPost, SingleData}