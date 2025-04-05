const Post = require('../../Models/Post.Models');
const Comments = require('../../Models/Comments.Models');
const Likes = require('../../Models/Likes.Models');
const View = require('../../Models/Count.Models');
const Bookmark = require('../../Models/Bookmark.Models');
const Follow = require('../../Models/Follow.Models');
const User = require('../../Models/User.Models');
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

const Get_User_Profile = async (req, res)=>{
  try {
    const { id } = req.params; // User ID from URL

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    // Fetch user data
    const user = await User.findById(id)
      .select('username name profilePicture followers following')
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch user's posts
    const posts = await Post.find({ author: id })
      .populate('author', 'username name profilePicture')
      .sort({ createdAt: -1 })
      .lean();

    // Return profile data
    res.json({
      user: {
        ...user,
        followersCount: Array.isArray(user.followers) ? user.followers.length : 0,
        followingCount: Array.isArray(user.following) ? user.following.length : 0,
      },
      posts,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

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
      .populate('author', 'username name profilePicture fullname')
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

const Like_Unlike = async (req, res)=>{
  const { id } = req.params;
  const userId = req.user._id; // Assuming req.user is set by auth middleware

  try {
    // Check for existing like
    const existingLike = await Likes.findOne({ author: userId, _id: id });
    if (existingLike) {
      return res.status(400).json({
        message: 'You have already liked this post',
        error: 'Duplicate like attempt'
      });
    }

    // Create and save the new like
    const like = new Likes({ author: userId, post: id });
    await like.save();

    // Update the post's likes array
    const post = await Post.findOne({ _id: id });
    if (!post) {
      // Rollback the like if post not found (optional cleanup)
      await Likes.deleteOne({ _id: like._id });
      return res.status(404).json({
        message: 'Post not found',
        error: 'Invalid post ID'
      });
    }
    
    post.likes = post.likes || []; // Ensure likes array exists
    post.likes.push(userId);
    await post.save();

    // Success response with message
    res.status(201).json({
      message: 'Post liked successfully',
      data: like
    });

  } catch (error) {
    // Generic error response with message
    res.status(400).json({
      message: 'Failed to like the post',
      error: error.message || 'An unexpected error occurred'
    });
  }
}

const dislike = async (req, res)=>{
  const { id } = req.params;
  const userId = req.user._id; // Assuming req.user is set by auth middleware

  try {
    // Check for existing like
    const like = await Likes.findOne({ author: userId, post: id });
    if (!like) {
      return res.status(400).json({
        message: 'You haven\'t liked this post yet',
        error: 'No like found'
      });
    }

    // Remove the like
    await Likes.deleteOne({ _id: like._id }); // More efficient than like.remove()

    // Update the post's likes array
    const post = await Post.findOne({ _id: id });
    if (!post) {
      // Edge case: Post deleted after like was found (optional handling)
      return res.status(404).json({
        message: 'Post not found',
        error: 'Invalid post ID'
      });
    }

    post.likes = (post.likes || []).filter(id => id.toString() !== userId.toString());
    await post.save();

    // Success response with message
    res.json({
      message: 'Post dislike successfully'
    });

  } catch (error) {
    // Generic error response with message
    res.status(400).json({
      message: 'Failed to unlike the post',
      error: error.message || 'An unexpected error occurred'
    });
  }
}

const comment = async (req, res)=>{
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user._id; // Assuming req.user is set by auth middleware

  try {
    // Validate content
    if (!content || typeof content !== 'string' || content.trim() === '') {
      return res.status(400).json({
        message: 'Comment content is required',
        error: 'Invalid input'
      });
    }

    // Create and save the comment
    const comment = new Comments({ content: content.trim(), author: userId, post: id });
    await comment.save();
    console.log(comment)
    // Success response with message
    res.status(201).json({
      message: 'Comment Posted successfully',
      data: comment
    });

  } catch (error) {
    // Generic error response with message
    res.status(400).json({
      message: 'Failed to add comment',
      error: error.message || 'An unexpected error occurred'
    });
  }
}

const bookmark = async (req, res)=>{
  const { id } = req.params;
  const userId = req.user._id; // Assuming req.user is set by auth middleware

  try {
    // Check for existing bookmark
    const existingBookmark = await Bookmark.findOne({ author: userId, post: id });
    if (existingBookmark) {
      return res.status(400).json({
        message: 'You have already bookmarked this post',
        error: 'Duplicate bookmark attempt'
      });
    }

    // Create and save the new bookmark
    const bookmark = new Bookmark({ author: userId, post: id });
    await bookmark.save();

    // Success response with message
    res.status(201).json({
      message: 'Post bookmarked successfully',
      data: bookmark
    });

  } catch (error) {
    // Generic error response with message
    res.status(400).json({
      message: 'Failed to bookmark the post',
      error: error.message || 'An unexpected error occurred'
    });
  }
}

const unbookmark = async (req, res)=>{
  const { id } = req.params;
  const userId = req.user._id; // Assuming req.user is set by auth middleware

  try {
    // Check for existing bookmark
    const bookmark = await Bookmark.findOne({ author: userId, post: id });
    if (!bookmark) {
      return res.status(400).json({
        message: 'You haven\'t bookmarked this post yet',
        error: 'No bookmark found'
      });
    }

    // Remove the bookmark
    await Bookmark.deleteOne({ _id: bookmark._id }); // More efficient than bookmark.remove()

    // Success response with message
    res.json({
      message: 'Post unbookmarked successfully'
    });

  } catch (error) {
    // Generic error response with message
    res.status(400).json({
      message: 'Failed to unbookmark the post',
      error: error.message || 'An unexpected error occurred'
    });
  }
}

const follow = async (req, res)=>{
  const { id } = req.params; // User to follow
  const followerId = req.user._id; // Current user

  try {
    // Find the user to follow
    const userToFollow = await User.findById(id);
    if (!userToFollow) {
      return res.status(404).json({
        message: 'User not found',
        error: 'Invalid user ID'
      });
    }

    // Prevent self-following
    if (id === followerId.toString()) {
      return res.status(400).json({
        message: 'You cannot follow yourself',
        error: 'Invalid action'
      });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({ fromUser: followerId, toUser: id });
    if (existingFollow) {
      return res.status(400).json({
        message: 'You are already following this user',
        error: 'Duplicate follow attempt'
      });
    }

    // Add follow relationship
    const follow = new Follow({ fromUser: followerId, toUser: id });
    await follow.save();

    // Ensure followers array exists
    userToFollow.followers = Array.isArray(userToFollow.followers) ? userToFollow.followers : [];
    userToFollow.followers.push(followerId);
    await userToFollow.save();

    // Success response
    res.status(201).json({
      message: 'User followed successfully',
      data: follow
    });

  } catch (error) {
    res.status(400).json({
      message: 'Failed to follow the user',
      error: error.message || 'An unexpected error occurred'
    });
  }
}

const unfollow = async (req, res)=>{
  const { id } = req.params; // User to unfollow
  const followerId = req.user._id; // Current user

  try {
    // Find the user to unfollow
    const userToUnfollow = await User.findById(id);
    if (!userToUnfollow) {
      return res.status(404).json({
        message: 'User not found',
        error: 'Invalid user ID'
      });
    }

    // Check if following exists
    const existingFollow = await Follow.findOne({ fromUser: followerId, toUser: id });
    if (!existingFollow) {
      return res.status(400).json({
        message: 'You are not following this user',
        error: 'No follow relationship found'
      });
    }

    // Remove follow relationship
    await Follow.deleteOne({ _id: existingFollow._id });

    // Ensure followers array exists and remove followerId
    userToUnfollow.followers = Array.isArray(userToUnfollow.followers) ? userToUnfollow.followers : [];
    userToUnfollow.followers = userToUnfollow.followers.filter(
      id => id && id.toString() !== followerId.toString()
    );
    await userToUnfollow.save();

    // Success response
    res.json({
      message: 'User unfollowed successfully'
    });

  } catch (error) {
    res.status(400).json({
      message: 'Failed to unfollow the user',
      error: error.message || 'An unexpected error occurred'
    });
  }
}

module.exports = { Create_Post, Get_User_Profile, Get_Single_Post, Get_All_Posts, Edit_Post, delete_Post, Like_Unlike, dislike, comment, bookmark, unbookmark, follow, unfollow };