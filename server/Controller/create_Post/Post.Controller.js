const Post = require('../../Models/Post.Models');
const Comments = require('../../Models/Comments.Models');
const Likes = require('../../Models/Likes.Models');
const View = require('../../Models/Count.Models');
const Bookmark = require('../../Models/Bookmark.Models');
const logger = require('../../utils/logger'); // Hypothetical logger (e.g., Winston or Pino)
const mongoose = require('mongoose');

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


const Get_Single_Post = async (req, res) => {
  try {
    const { id } = req.params; // post Id
    console.log('Received postId:', id);

    if (!id) {
        return res.status(400).json({ error: 'Post ID is required' });
      }

    // Note: find() returns an array, use findOne() for single document
    const post = await Post.findOne({ _id: id })
      .populate('author', 'username name profilePicture');
    console.log(post)
    if (!post) {
      throw new Error('Post not found');
    }
    
    // Track view if user is authenticated
    if (req.user) {
      const existingView = await View.findOne({ 
        author: req.user._id,
        post: post._id 
      });
      console.log("user exist",existingView)
      if (!existingView) {
        const view = new View({ 
          author: req.user._id, 
          post: post._id 
        });
        await view.save();
        post.viewCount += 1;
        await post.save();
      }
    }
    
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Get all posts
const Get_All_Posts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username name profilePicture')
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
    
    res.json({"message" : "Single post fetch it.", posts});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Edit_Post = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Validate content
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content is required." });
    }

    // Validate post ID
    if (!id) {
      return res.status(400).json({ message: "Post ID is required." });
    }

    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Post ID format" });
    }

    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Ensure user ID is also valid
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    // Convert string IDs to ObjectId for query if needed
    const postId = new mongoose.Types.ObjectId(id);
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Find the post
    const post = await Post.findOne({ 
      _id: postId, 
      author: userId
    });

    // If post not found, check if it exists at all
    if (!post) {
      const postExists = await Post.findById(id);
      if (postExists) {
        return res.status(403).json({ 
          message: "Post exists but you don't have permission to edit it" 
        });
      }
      return res.status(404).json({ 
        message: "Post not found in database" 
      });
    }

    // Update and save the post
    post.content = content;
    const updatedPost = await post.save();

    return res.status(200).json({ 
      message: "Post Edited Successfully", 
      post: updatedPost 
    });

  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};

const delete_Post = async (req, res)=>{
  const { id } = req.params;
  const userId = req.user._id; // Assumes req.user is set by auth middleware

  try {
    // Start logging for debugging
    logger.debug(`Attempting to delete post with ID: ${id} by user: ${userId}`);

    // Use findOne instead of find for single document lookup
    const post = await Post.findOne({ _id: id, author: userId }).lean();
    if (!post) {
      logger.warn(`Post not found or unauthorized for ID: ${id}, user: ${userId}`);
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    logger.debug(`Post found: ${post._id}, proceeding with deletion`);

    // Batch delete operations using Promise.all for parallelism
    const deleteOperations = [
      Comments.deleteMany({ post: post._id }),
      Likes.deleteMany({ post: post._id }),
      View.deleteMany({ post: post._id }),
      Bookmark.deleteMany({ post: post._id }),
      Post.deleteOne({ _id: post._id }) // Replace post.remove() with deleteOne
    ];

    // Execute all deletions concurrently
    await Promise.all(deleteOperations.map(op => 
      op.catch(err => {
        logger.error(`Partial failure in delete operation: ${err.message}`);
        throw err; // Re-throw to trigger outer catch
      })
    ));

    logger.info(`Post ${id} and related data deleted successfully by user: ${userId}`);
    res.json({ message: 'Post deleted successfully' });

  } catch (error) {
    // Enhanced error handling
    logger.error(`Failed to delete post ${id}: ${error.message}`, { stack: error.stack });
    res.status(error.status || 400).json({ 
      error: error.message || 'Failed to delete post',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }) // Debug info in dev
    });
  }
}

module.exports = { Create_Post, Get_Single_Post, Get_All_Posts, Edit_Post, delete_Post };