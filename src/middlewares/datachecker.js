import { userInfo } from "os";
import UserInfos from "../models/user";

class DataChecker{
    static async isEmailExist (req,res,next){
        const user=await UserInfos.findOne({email:req.body.email});
        if(!user){
            return next();
        }
        return res.status(401).json({error:"email already exists you must try another!"})
    }
}
export default DataChecker;