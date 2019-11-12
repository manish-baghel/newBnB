import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ApartmentModel = new Schema(
	{
		name:{type:String,required:true,trim:true},
		category:{type:String,trim:true},
		size:{t}

	}
);