const express = require("express");
const Authentecation = require("../Controller/Authentications/User.Controller");
const isAdmin = require("../Middlewares/X_Authentication_Middleware");
const router = express.Router();
const upload = require("../Middlewares/Image");

// User Authentecation Routes
router.post("/signup",upload.single("profilePicture"), Authentecation.Signup);
router.post("/signin", Authentecation.Signin);
router.post("/loggout", Authentecation.loggout);

// // Admin Route Access
// router.get("/getallusers",isAdmin, AdminRoute.GetUser)
// router.delete("/delete/:id",isAdmin, AdminRoute.DeleteUser)

// // Post Routes
// router.post("/create",upload.fields(
//     [
//         {
//             name : "coverImage",
//             maxCount : 1
//         },
//         {
//             name : "video",
//             maxCount : 1
//         }
//     ]
// ), Main.AddPost)

// router.get("/alldisorder", Main.getAllDisorder)
// router.get("/singledata/:id", Main.SingleData)
// router.get("/search/:key", Main.SearchPost)
// router.delete("/deleteuser/:id", Main.DeletePost)

module.exports = router;