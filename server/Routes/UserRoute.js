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
router.get("/user/:username",upload.single("profilePicture"), Authentecation.Signup);

// // Post Routes
router.post("/create",authenticated, AddPost.Create_Post)

router.get("/all_Post", AddPost.Get_All_Posts);
router.get("/single_post/:id", authenticated, AddPost.Get_Single_Post);
router.put("/:id/edit", authenticated, AddPost.Edit_Post);
router.delete("/:id/delete", authenticated, AddPost.delete_Post);

module.exports = router;