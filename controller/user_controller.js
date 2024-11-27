const userSchema = require('../modules/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const newUser = async (req,res)=>{

    try {
        const {name,email,password,role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message:"All fields are required"});
        }
        const uniqueuser = await userSchema.findOne({email:email});
        if(uniqueuser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const user = new userSchema({
            name,email,password:hashedPassword,role
        });
        await user.save();
        if(user){
            const token = jwt.sign({id:user._id, email:user.email,role:user.role},'saymyname',{expiresIn:'1h'});
            return res.status(200).json({message:"User created",token:token,user:user});
        }
        else{
            return res.status(500).json({message:"Failed to create user"});
        }


    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await userSchema .findOne({email:email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({message:"wrong password"});
        }
        const token = jwt.sign({id:user._id,email:user.email,role:user.role},'saymyname',{
            expiresIn:'1d'
        });
        return res.status(200).json({message:"Login successful",token:token,user:user});
    } catch (error) {
        console.log(error);
    }
}       

const verifyUser = async (req,res)=>{
    try {
        const user = await userSchema.findById(req.userId);
        console.log(user);
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        return res.status(200).json({message:"User verified",user:user});

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {newUser,loginUser,verifyUser};