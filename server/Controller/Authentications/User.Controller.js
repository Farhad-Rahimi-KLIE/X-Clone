const User = require("../../Models/User.Models");
const jwt = require("jsonwebtoken");

  const Signup = async (req, res) => {
    const { username, email, password, fullname, bio } = req.body;
    if (
      [username, email, password].some((field)=> field?.trim() === "")
    ) {
      return res.status(400).json({message : "All Fields are Required."})
    }

    const ExistUser = await User.findOne({
      $or : [{email}, {password}]
    })

    if (ExistUser) {
      return res.status(400).json({message : "User with Email or Password Already Exist."})
    }

    const user = await User.create({
      username : username,
      email : email,
      password : password,
      fullname : fullname,
      bio : bio,
      profilePicture : req.file.filename
    })

    const createUser = await User.findById(user._id).select("-password")

    if (!createUser) {
      return res.status(500).json({message : "Somthing weng wrong while Registering the user."})
    }

    return res.status(200).json({message : "User Registered Successfully.", createUser})

  };


  const Signin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({message : "Email or Password is Required."})
    }

    const user = await User.findOne({
      $or : [{email}, {password}]
    })

    if (!user) {
      return res.status(404).json({message : "User Does not Exist."})
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({message : "Invalid User Credentials"})
    }

    const token = await jwt.sign({userID : user._id}
      , process.env.ACCESS_TOKEN_SECRET
      , {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
      )

    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
      httpOnly : true,
      secure : true
    }

    res.cookie("token", token, options)
     return res.status(200).json({message : "User logged In Successfully", user : loggedInUser, token})
  };

  const loggout = async (req, res)=>{
    try {
      res.clearCookie("token")
      res.status(200).json({message : "User logged out Successfully"})
    } catch (error) {
      res.status(500).json({message : "Internal Server Error", error})
    }
  }

  const get_all_users = async (req, res)=>{
    try {
      // Assuming you have a User model
      const users = await User.find(); // Fetch all users from your database
      res.status(200).json({ success: true, users });
  } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching users", error });
  }
  }
module.exports = {Signup, Signin, loggout, get_all_users};
