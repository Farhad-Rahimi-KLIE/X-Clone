const Post = require('../../Models/Post.Models');

const Create_Post = async (req, res) => {
    const { content } = req.body;
    try {
        console.log(content); // Debugging
        if (!content || content.trim() === "") {
            return res.status(400).json({ message: "Content is required." });
        }

        const AddPost = await Post.create({
            content : content,
            author : req.user._id
        })
        return res.status(200).json({ message: "Post Created Successfully", AddPost })
    } catch (error) {
        return res.status(400).json({ message: "Goat Some Errors", error })
    }
};
module.exports = { Create_Post };
