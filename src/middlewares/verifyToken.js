import TokenAuth from "../helpers/tokenAuth";
const jwt=require("jsonwebtoken");
const config=process.env;
const VerifyToken=(req,res,next) => {
  const token=req.body.token||req.query.token||req.headers["x-auth-token"];
  if(!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try{

  const user = TokenAuth.decodeToken(token);
  
  req.user = user.user;
  return next();

    
  }catch(err){
    return res.status(401).send("Invaid Token")
  }
 
};
module.exports=VerifyToken;

// const isUserExist = async (req, res, next) => {
//   try {
//     const token = req.header("x-auth-token");
//     if (!token) {
//       return res.status(400).json({ error: "no token provided" });
//     }
//     const data = TokenAuth.decodeToken(token);
//     console.log(data);
//     req.user = data;

//     return next();
//   }
//    catch (err) {
//     console.log(err);
//   }
// }
// export default isUserExist;
