import express from "express"; // package has role on routing and data management
import tourController from "../controllers/tourController";
import Validator from "../middlewares/validator";
import VerifyToken from "../middlewares/verifyToken";

import dotenv from "dotenv";
import VerifyAccess from "../middlewares/verifyAccess";
const tourRouter = express.Router();

tourRouter.post("/createTours",
VerifyToken,VerifyAccess("admin"),
Validator.newTourRules(), 
Validator.validateInput, 
 tourController.createTour
 );
tourRouter.get("/allTours", tourController.getAllTours);
tourRouter.get("/:id",tourController.getOneTour);
tourRouter.delete("/:id",tourController.deleteOneUser);
export default tourRouter;