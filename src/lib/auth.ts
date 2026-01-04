import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins: [process.env.app_url || "http://localhost:4000"],
    user :{
        additionalFields: {
            role:{
                type: "string",
                defaultValue: "user",
                required: false,
            },
            phone:{
                type: "string",
                required: false,
            },
            status:{
                type: "string",
                defaultValue: "active",
                required: false,
            }
        }
    },
    emailAndPassword: { 
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    },
      emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      const info = await transporter.sendMail({
    from: '"prisma-blog" <prisma53@ethereal.email>',
    to: "kbdomarfaruqsau@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: "<b>Hello world?</b>", // HTML version of the message
    
  });
   console.log("Message sent:", info.messageId);
    },
  },
});