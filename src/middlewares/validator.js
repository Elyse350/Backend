import { check, validationResult } from "express-validator";


import UserInfos from "../models/user";
class Validator {
  static validateInput = (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors.map((err) => err.msg);
      return res.status(400).json({ messege: errorMessage });
    }
    return next();

  };
  static newAccountRules(){
      return[
          check("email","email is valid").trim()
            .isEmail()
            .custom((value) => {
              return UserInfos.find({email: value})
                .then((user) => {
                  if(user && user.length > 0){
                    return Promise.reject('Email has already been taken')
                  }
                })
            }),
          check("password","password is not strong").trim().isStrongPassword(),
          check("lastName","last name should be valid").trim().isAlpha(),
          check("firstName","first name should be valid").trim().isAlpha(),
          check("gender","gender should be valid among male,female,other,not-say").trim().isIn(["male","female","other","not-say"]),
      ];
    }
    static newTourRules(){
      return[
        check("tittle","tittle is valid").trim().isLength({min: 5,max: 50}),
        check("description","descripion should be valid").trim().isLength({min: 5,max: 1024}),
        check("seats","seats is not shown").trim().isNumeric(),
        check("available","available is not shown").trim().isNumeric(),
        check("datescheduled","datescheduled is not set").trim().isDate(),
        check("duedate","duedate is not set").trim().isDate(),
        check("price","price is not shown").trim().isNumeric()
    ];
    }
}
export default Validator;
