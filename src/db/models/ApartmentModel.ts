import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ApartmentSizeSchema = new Schema(
	{
		bedrooms:{type:Number},
		bathrooms:{type:Number},
		washrooms:{type:Number},
		halls:{type:Number},
		kitchen:{type:Number},
		other:{type:String}
	}
);

const AmenitiesSchema = new Schema(
	{
		ac:{type:Number},
		wifi:{type:Boolean},
		washingMachine:{type:Number},
		tables:{type:Number},
		chairs:{type:Number},
		pool:{type:Number},
		other:{type:String}
	}
);

const ApartmentSchema = new Schema(
	{
		name:{type:String,required:true,trim:true},
		category:{type:String,trim:true},
		size:ApartmentSizeSchema,
		amenities:AmenitiesSchema,
		gallery:[{type:String,trim:true}],
		address:{type:String,trim:true},
		location:{type:String,trim:true},// lat long
		booked:{type:Boolean,default:false},
		bookedBy : {type: Schema.Types.ObjectId, ref:"User"}
	},
	{timestamps:true}
);


const Apartment = mongoose.model("Apartment",ApartmentSchema);

export default Apartment;