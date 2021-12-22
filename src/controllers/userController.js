import UserInfos from "../models/user";
import TokenAuth from "../helpers/tokenAuth";
const bcrypt = require('bcrypt');
class UserController{
    //create user in db
    static async createUser(req,res){

        const hashPassword=bcrypt.hashSync(req.body.password,10);
        req.body.password=hashPassword;
        const user =await UserInfos.create(req.body)// return generated data
        if(!user){
            return res.status(404).json({error:"user not registered"})
        }
        return res
        .status(200)
        .json({message:"User created successfully" , data: user});
    }
    //get all users
    static async getAllUsers(req,res){
        const users= await UserInfos.find(); // return generated data
        if(!users){
            return res.status(404).json({error:"no users registered"})
        }
        return res
        .status(200)
        .json({message:"Successfully retrieved users" , data: users});
    }
    static async getOneUser(req,res){
        const user=await UserInfos.findById(req.params.id);
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        return res.status(200).json({message:"user found successfully",data:user})
    }
    static async deleteOneUser(req,res){
        const user=await UserInfos.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({error:"user not deleted"})
        }
        return res.status(200).json({message:"user deleted successfully",data:user})
    }
    static async userLogin(req,res){
        const user=await UserInfos.findOne({email:req.body.email});
        console.log(user)
        if(!user){
          return res.status(404).json({error:"user not found! kindly register first"})
        }
        if(bcrypt.compareSync(req.body.password,user.password)){
          user.password=null;
          const token=TokenAuth.TokenGenerator({user:user});
          return res.status(200).json({message:"successfully logged in",token:token});
        }

        return res.status(404).json({error:"Password incorrect!"})
    }
}
export default UserController;
// controller is the one directlly connected on database
// controller is where all the action are done