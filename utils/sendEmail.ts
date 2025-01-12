import nodemailer from "nodemailer";
import { NodeError } from "./NodeError.js";


export const sendVerificationEmail = async (email:string, code:string) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth:{
            user: process.env.EMAIL_HOST,
            pass: process.env.EMAIL_PASS
        }
    })
    
    const mailOptions = {
        from: process.env.EMAIL_HOST,  
        to: email,  
        subject: 'Email Verification',  
        text: `Your verification code is ${code}`,  
    };
    
    try {
        await new Promise<void>((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  reject(error);
                } else {
                  resolve();
                }
              });
        })

    } catch (error) {
        throw new NodeError("Email Send Unsuccessfull! Server Functionality Issue",500);
    }
}