import { Request, Response, NextFunction} from "express";
import cryptService from "../services/cryptService";
import * as path from "path";
import boom from "boom";
import User from "../db/models/UserModel";
import Apartment from "../db/models/ApartmentModel";
import Session from "../db/models/SessionModel";
import { IToken } from "../middlewares/expressSession";
import AuthService from "../services/authService";


const registerApartment = async (req:Request,res:Response,next:NextFunction) => {
	//{params} = req.body

	// {params} validation

	//const newApartment = new Apartment({params})
	// ApartmentDoc =await newApartment.save()

	// return res.json({status:true,ApartmentDoc,msg:"...."})
}


const removeApartmentById = async (req:Request,res:Response,next:NextFunction) => {
	//{id_param} = req.body

	//{params} validation

	//const Apartment_model = Apartment.findOne({_id:id_param})
	//const ApartmentDoc = await Apartment_model.remove()

	// return res.json({status:true,id_param,msg:"...."})
}
