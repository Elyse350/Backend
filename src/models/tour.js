import mongoose from 'mongoose';
const tourSchema = new mongoose.Schema(  // Scheam is a format or a structure of our model, it will generate our model in db
     {
       tittle:String,
    
       description: {
           type:String,
           required:true,
        
       },
       seats:{
           type:Number,
           required:true,
       },
       available:{
           type:Number,
        
        },
       dateScheduled:Date,
       
           duedate:Date,
       
       user: {
        type:mongoose.Schema.ObjectId,
        ref: "User"
    },
    },
       {
           timestamps: true,  // means igihe byabereye stored
       }
);
tourSchema.pre(/^find/,function(next){
    this.populate({path:"user",
select: "lastName email address"
    });
    next();
})
const tour = mongoose.model('Tour',tourSchema);

export default tour;