import { Request, Response, NextFunction} from "express";
import cryptService from "../services/cryptService";
import * as path from "path";
import boom from "boom";
import User from "../db/models/UserModel";
import Session from "../db/models/SessionModel";
import { IToken } from "../middlewares/expressSession";
import AuthService from "../services/authService";
import validator from "../utils/validator";
import { IRole,IUserRegister } from "../db/modelServices/IUserModel";

interface IUserValidation {
    status: boolean,
    msg: string,
    target: string
};



const registerUser = async (req:Request, res:Response, next:NextFunction) => {
	if(!req.body)
		return next(boom.unauthorized("Please enter all required fields"));
	let reqObject:IUserRegister = req.body;
	const role:IRole = {
		title:"customer"
	}
	const userValidationObject: IUserValidation = _validateUser(first_name,last_name, email, phone);
    if (!userValidationObject.status)
        return res.json(userValidationObject);
    try{
    	let hpass = await cryptService.hash(password);
    	let userModel = {
    		email,
    		first_name,
    		last_name,
    		password:hpass,
    		gender,
    		dob,
    		middle_name,
    		phone,
    		role
    	}
    	const newUser = new User(userModel);
    	const user = await newUser.save();
    	if(!user)
    		return next(boom.badImplementation("Unable to create user"));
    	const user_id = user._id.toString();
    	let session_id:string;
    	let loggedInAt:any = Date.now()
    	let sessionModel:any = {
    		loggedInAt,
    		user:user._id
    	}
    	let newSession = new Session(sessionModel);
    	let session = await newSession.save();
    	if(!session)
    		return next(boom.badImplementation("Unable to create user session"));
    	const newToken = cryptService.sign({id:session._id.toString()});
    	return res.json({status:true,msg:"Registered Succesfully",data:{token:newToken,first_name,last_name,email,role:role.title}});
    }catch(err){
    	console.log("==> Error in registerUser [userController]", err);
    	return res.json({status:false,msg:"Something Went wrong",data:null});
    }
}



const _validateUser = (first_name: string,last_name: string, email: string, phone: string) => {
    const validationObj = { status: false, msg: '', target: '' };
    let name = first_name+" "+last_name;
    if (!name) {
        validationObj.msg = "Name is a required field but got none";
        validationObj.target = "name";
        return validationObj;
    }
    if (!email) {
        validationObj.msg = "Email is a required field but got none";
        validationObj.target = "email";
        return validationObj;
    }
    const isEmailValid = validator.validateEmail(email);
    if (!isEmailValid) {
        validationObj.msg = "Email format not valid";
        validationObj.target = "email";
        return validationObj;
    }

    if (!phone) {
        validationObj.msg = "Phone is a required field";
        validationObj.target = "phone";
        return validationObj;
    }
    validationObj.status = true;
    validationObj.msg = "Data is cool";
    return validationObj;
}