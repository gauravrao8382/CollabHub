import nodemailer from "nodemailer";

export const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    await transporter.sendMail({
        from: "Collab-Hub",
        to: email,
        subject: "Collab-Hub - Email Verification OTP",
        text: `Hello,
        Thank you for registering on Collab-Hub.
        Your OTP is: ${otp}
        Valid for 5 minutes.`
    });
};