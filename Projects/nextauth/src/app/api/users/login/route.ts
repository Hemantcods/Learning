import { connect } from "@/db/dbconfig";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody
        // validation
        const user=await User.findOne({email:email})

        if(!user){
            return NextResponse.json({error:"User doesn't exists"},{status:400})
        }
        const validation=bcrypt.compare(password,user.password)
        if(!validation){
            return NextResponse.json({error:"check your username or password"},{status:400})
        }
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token=jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        
        const response=NextResponse.json({
            message:'logged in sucess',
            sucess:true
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}