const User = require("../Models/User")
const jwt = require("jsonwebtoken");
const isAdmin = async (req, res, next)=>{
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")

    try {
        if (!token) {
          return res.status(401).json({message : "Unauthorized Request"})
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?.userID).select("-password")
  

    
        if (!user) {
          return res.status(401).json({message : "User Not Found."})
        }

        if (user.Role !== "admin") {
          return res.status(401).json({message : "UnAuthorized: User is not a Admin"})
        }

        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({message : "Invalid Access Token", error})
    }
}

module.exports = isAdmin;
