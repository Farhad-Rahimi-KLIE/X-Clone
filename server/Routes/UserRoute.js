const express = require("express");
const Authentecation = require("../Controller/Authentications/User.Controller");
const User_Profile = require("../Controller/Profile/profile.details.Controller");
const AddPost = require("../Controller/create_Post/Post.Controller");
const authenticated = require("../Middlewares/Authentecation.MiddleWare");
const router = express.Router();
const upload = require("../Middlewares/Image");

// User Authentecation Routes
router.post("/signup",upload.single("profilePicture"), Authentecation.Signup);
router.post("/signin", Authentecation.Signin);
router.post("/loggout", Authentecation.loggout);

// Profile Route
// router.get("/user/:username",upload.single("profilePicture"), Authentecation.Signup);

// // Post Routes
router.post("/create",authenticated, AddPost.Create_Post)

router.get("/all_Post", AddPost.Get_All_Posts);
router.get("/single_post/:id", authenticated, AddPost.Get_Single_Post);
router.put("/:id/edit", authenticated, AddPost.Edit_Post);
router.delete("/:id/delete", authenticated, AddPost.delete_Post);
router.post("/:id/like", authenticated, AddPost.Like_Unlike);
router.post("/:id/dislike", authenticated, AddPost.dislike);
router.post("/:id/comment", authenticated, AddPost.comment);
router.post("/:id/bookmark", authenticated, AddPost.bookmark);
router.post("/:id/unbookmark", authenticated, AddPost.unbookmark);
router.post("/follow/:id", authenticated, AddPost.follow);
router.post("/unfollow/:id", authenticated, AddPost.unfollow);

module.exports = router;