const Post = require('../../Models/Post.Models');

const Create_Post = async (req, res) => {
    const { content } = req.body;
    try {

        // Check if content is provided
        if (!content || content.trim() === "") {
            return res.status(400).json({ message: "Content is required." });
        }

        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        // Create the post
        const AddPost = await Post.create({
            content: content, // Consistent syntax (no space before colon)
            author: req.user._id
        });

        return res.status(201).json({ message: "Post Created Successfully", AddPost });
    } catch (error) {
        console.error('Error creating post:', error); // Log for debugging
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { Create_Post };