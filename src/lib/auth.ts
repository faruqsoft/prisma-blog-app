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
    autoSignIn: false,
    requireEmailVerification: true,
    },
      emailVerification: {
        sendOnSignUp: true,
    sendVerificationEmail: async ( { user, url, token }, request) => {
  try{
        const verifiedUrl = `${process.env.app_url}/verify-email?token=${token}`;
      const info = await transporter.sendMail({
   from: `"Prisma Blog" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Please verify your email for Prisma Blog",
  // Plain-text version of the message
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    }
    .header {
      background: #4f46e5;
      color: #ffffff;
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
    }
    .content {
      padding: 30px;
      color: #333333;
      line-height: 1.6;
    }
    .content p {
      margin: 0 0 16px;
    }
    .button-wrapper {
      text-align: center;
      margin: 30px 0;
    }
    .verify-button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #4f46e5;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
    }
    .footer {
      padding: 20px;
      background: #f9fafb;
      color: #777777;
      font-size: 13px;
      text-align: center;
    }
    .footer a {
      color: #4f46e5;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>

    <div class="content">
      <p>Hi <strong>${user.name}</strong>,</p>

      <p>
        Thanks for signing up for <strong>Prisma Blog</strong> 🎉  
        Please confirm your email address by clicking the button below.
      </p>

      <div class="button-wrapper">
        <a href="${verifiedUrl}" class="verify-button">
          Verify Email
        </a>
      </div>

      <p>
        If you did not create an account, you can safely ignore this email.
      </p>

      <p>
        This link will expire in a short time for security reasons.
      </p>

      <p>— Prisma Blog Team</p>
    </div>

    <div class="footer">
      <p>
        If the button doesn’t work, copy and paste this link into your browser:
      </p>
      <p>
        <a href="${verifiedUrl}">${verifiedUrl}</a>
      </p>
    </div>
  </div>
</body>
</html>
` // HTML version of the message
    
  });
   console.log("Message sent:", info.messageId);
  } catch(err){
    console.log("Error sending verification email:", err);
  }
    },
  },
});