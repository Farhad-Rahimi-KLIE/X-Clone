const User = require("../Models/User")

const GetUser = async(req, res)=>{
    try {
        const user = await User.find().select("-password");
       return  res.status(200).json({message : "All Users Fetch it", user})
    } catch (error) {
       return  res.status(500).json({message : "Internal server error"})
    }
}

const DeleteUser = async(req, res)=>{
    try {
        const userId = req.params.id;

        const checkAdmin = await User.findById(userId);
        if (checkAdmin.Role == "admin") {
        return res.status(409).json({message : "You Can Not Delete Yourself."})
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
        return res.status(404).json({message : "User Not Found"})
        }

       return  res.status(200).json({message : "User Delete Successfully", user})

    } catch (error) {
       return  res.status(500).json({message : "Internal server error"})
    }
}

module.exports = {GetUser, DeleteUser}