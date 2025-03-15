const jwt = require("jsonwebtoken")
const UserModel = require("../Models/User");

const CheckUserAuthentecated = async (req, res, next)=>{
    let token;
    const {authorization} = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const {userID} = jwt.verify(token, "pleaseSubscribe");
            req.writedBy = await UserModel.findById(userID).select("--password");
            next()
        } catch (error) {
            return res.status(401).json({message : "UnAuthorized User"})
        }
    }else{
        return res.status(401).json({message : "UnAuthorized User"})
    }
}

module.exports = CheckUserAuthentecated;