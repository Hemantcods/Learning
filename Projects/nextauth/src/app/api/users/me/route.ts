import { connect } from "@/db/dbconfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect()

export async function POST(request:NextRequest){
    // extract id from token
    const userid=await getDataFromToken(request)
    
    if(!userid){
        NextResponse.json({error:"no user found"},{status:400}) 
    }
    const curUser= await User.findOne({_id:userid}).select("-password")
    // check if there is no user  
    if(!curUser){
        return NextResponse.json({error:"no user found"},{status:400})
    }
    else{
       return NextResponse.json({user:curUser},{status:200})
    }
}