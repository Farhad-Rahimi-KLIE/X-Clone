const User = require('../../Models/User.Models');
const Post = require('../../Models/Post.Models');
const Follow = require('../../Models/Follow.Models');

const Profile_Details = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.find({ username });
        if (!user) {
            throw new Error('User not found');
        }
        const posts = await Post.find({ author: user._id }).populate('author', 'username name profilePicture');
        const followersCount = await Follow.countDocuments({ toUser: user._id });
        const followingCount = await Follow.countDocuments({ fromUser: user._id });
        res.json({message : "User Profile Page.", user, posts, followersCount, followingCount });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
module.exports = { Profile_Details };
