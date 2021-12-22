

const VerifyAccess=(RequireRole)=>{
    return async(req,res,next)=>{
        try{
            const {Role}=req.user;
            if(RequireRole!=Role){
                return res.status(403).json("Not macth")
            }
            return next()
        }
        catch(err){
            console.log("erro")
          }
    }
}
export default VerifyAccess;



