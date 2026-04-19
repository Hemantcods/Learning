import { connect } from "@/db/dbconfig";
import User from '@/models/user.model'
import { sendEmail } from "@/utils/mailer";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server'


connect()


export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json()
        const { username, email, password }= reqbody
        // validation


        // check if user exists
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // store in db
        const newUser=new User({
            username,
            password:hashedPassword,
            email
        })
        const savedUser=await newUser.save()


        // send verification email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})


        return NextResponse.json({
            message:"User registered sucessfully",
            sucess:"true",
            savedUser
        })
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}