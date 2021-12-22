import TourInfos from "../models/tour";
class TourController{
    //create tour in db
    static async createTour(req,res){
        console.log(req.body)
        req.body.user="req.user._id";
        const tour= await TourInfos.create(req.body); // return generated data
        if(!tour){
            return res.status(404).json({error:"tour not registered"})
        }
        return res
        .status(200)
        .json({message:"tour created successfully" , data: tour});
    }
    //get all tours
    static async getAllTours(req,res){
        const tours= await TourInfos.find(); // return generated data
        if(!tours){
            return res.status(404).json({error:"no tours registered"})
        }
        return res
        .status(200)
        .json({message:"Successfully retrieved tours" , data: tours});
    }
    static async getOneTour(req,res){
        const tour=await TourInfos.findById(req.params.id);
        if(!tour){
            return res.status(404).json({error:"user not found"})
        }
        return res.status(200).json({message:"user found successfully",data:tour})
    }
    static async deleteOneUser(req,res){
        const tour=await TourInfos.findByIdAndDelete(req.params.id);
        if(!tour){
            return res.status(404).json({error:"user not deleted"})
        }
        return res.status(200).json({message:"user deleted successfully",data:tour})
    }
}
export default TourController;
// controller is the one directlly connected on database
// controller is where all the action are done