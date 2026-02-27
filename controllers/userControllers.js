import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../config/utils.js";
import cloudinary from "../config/cloudinary.js";

export const signUp = async(req, res) => {
    const { fullName, email, password,bio } = req.body;
    try{
    if(!fullName || !email || !password || !bio){
        return res.json({success: false,message: 'Missing Details'});
    }
    const user = await User.findOne({email});
    if(user){
       return res.json({success:false,message:"Account already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 12);
     const newUser = new User({
         fullName, email, password: hashedPassword, bio
     });
     await newUser.save()
     const token = generateToken(newUser._id);
     return res.json({success:true, user: newUser,token,message:"Account  created successfull"});
    }
    catch(error){
        res.json({success:false, message:error.message});
   console.log(error);
    }
}

export const login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const userData = await User.findOne({email})
        if (!userData) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, userData.password)
        if(!isPasswordCorrect){
        return res.json({success:false,message:"Invalid Credentials"});
    }
        const token = generateToken(userData._id);
        return res.json({success:true, user: userData,token,message:"Login successfull"});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }
}


//controller to update user profile
export const updateProfile = async(req, res) => {
    try{
        const {profilePic, bio, fullName} = req.body;

        const userId = req.user._id;
        let updatedUser;
        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio,fullName},
                {new: true});
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url,
            bio,fullName},{new: true});
        }

        res.json({success:true, user: updatedUser});
    }
    catch(error){
        console.log(error.message);
  res.json({success:false, message:error.message});
    }
}