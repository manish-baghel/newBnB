import * as jwt from "./jwtService";
import * as bcrypt from "bcryptjs";
import { promisify } from "util";
import { env } from "../app";

const SESSION_SECRET = env.SESSION_SECRET;
const SALT_ROUNDS = env.SALT_ROUNDS;

const cryptService = {
  hash: promisify(_hash),
  verify : promisify(_verify),
  sign: _sign
}

const _hash = async (pass:string, cb:Function) => {
  try{
    const hash = promisify(bcrypt.hash);
    const hashed = await hash(pass, SALR_ROUNDS);
    return cb(null,hashed);
  }catch(err){
    console.log("==> Error in _hash cryptService: ", err);
    return cb(err,null);
  }
}

const _verify = async (token:string,cb:Function) => {
  try{
    const tokenData:any = await jwt.verify(token, SESSION_SECRET);
    return cb(null,{id: tokenData.id});
  }catch(err){
    console.log("==> Error in _verify cryptService: ", err);
    return cb(err,null);
  }
}

const _sign = (payload: any) => {
    return jwt.sign(payload, SESSION_SECRET);
}

export default cryptService;
