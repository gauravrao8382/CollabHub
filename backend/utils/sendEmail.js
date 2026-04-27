import axios from "axios";

export const sendEmail = async (email, otp) => {
  try {
    console.log("API KEY:", process.env.BREVO_API_KEY);

    const emailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Verify Email</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: #f4f7fb;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 50px rgba(0,0,0,0.08);
        }
        .header {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          padding: 35px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          color: #ffffff;
          font-size: 26px;
          letter-spacing: 1px;
        }
        .header p {
          margin-top: 8px;
          color: #cbd5e1;
          font-size: 14px;
        }
        .content {
          padding: 40px 30px;
          text-align: center;
        }
        .content h2 {
          margin-bottom: 10px;
          color: #0f172a;
          font-size: 22px;
        }
        .content p {
          color: #555;
          font-size: 15px;
          line-height: 1.6;
        }
        .otp-box {
          background: #f1f5f9;
          border: 2px dashed #3b82f6;
          border-radius: 12px;
          padding: 20px;
          margin: 30px 0;
          display: inline-block;
        }
        .otp-code {
          font-size: 34px;
          font-weight: bold;
          letter-spacing: 10px;
          color: #1e40af;
          font-family: monospace;
        }
        .note {
          background: #eef2ff;
          border-left: 4px solid #3b82f6;
          padding: 12px 15px;
          border-radius: 8px;
          margin-top: 20px;
          font-size: 13px;
          color: #444;
          text-align: left;
        }
        .footer {
          background: #f8fafc;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #888;
          border-top: 1px solid #eee;
        }
        .footer a {
          color: #3b82f6;
          text-decoration: none;
        }
        @media (max-width: 600px) {
          .container {
            margin: 20px;
          }
          .otp-code {
            font-size: 28px;
            letter-spacing: 6px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 CollabHub</h1>
          <p>Secure Email Verification</p>
        </div>

        <div class="content">
          <h2>Verify Your Email</h2>
          <p>Welcome to <strong>CollabHub</strong> 👋</p>
          <p>Use the OTP below to complete your verification.</p>

          <div class="otp-box">
            <div class="otp-code">${otp}</div>
          </div>

          <p><strong>This code will expire in 5 minutes.</strong></p>

          <div class="note">
            🔒 If you didn’t request this, you can safely ignore this email.
          </div>

          <p style="margin-top: 25px; font-size: 14px;">
            Need help? <a href="mailto:support@collabhub.com">Contact Support</a>
          </p>
        </div>

        <div class="footer">
          <p>© 2026 CollabHub. All rights reserved.</p>
          <p><a href="#">Privacy Policy</a> • <a href="#">Terms</a></p>
        </div>
      </div>
    </body>
    </html>
    `;

    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "CollabHub",
          email: process.env.BREVO_USER,
        },
        to: [{ email }],
        subject: "🚀 CollabHub Email Verification OTP",
        htmlContent: emailHTML,
        textContent: `Your CollabHub OTP is: ${otp}`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent:", res.data);
    return true;

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error.response?.data || error.message);
    return false;
  }
};