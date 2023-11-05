const User = require("../../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const createVerificationToken = (length) => {
  return crypto.randomBytes(length).toString("hex");
};
const sendEmailVerificationMail = async (req, res) => {
  const { userId } = req.params;
  try {
    //Generate Token
    const verificationToken = createVerificationToken(16);

    const user = await User.findByIdAndUpdate(
      userId,
      { verificationToken: verificationToken },
      { new: true }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // true for SSL, false for TLS
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    const mailOptions = {
      from: {
        name: "DOS",
        address: process.env.ZOHO_USER,
      },
      to: user.email,
      subject: "Welcome to DOS",
      html: `<!DOCTYPE html>
        <html>
          <head>
            <style>
              /* Inline CSS for email compatibility */
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f5fc; /* Light blue background */
              }
        
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
              }
        
              .header {
                background-color: #3498db; /* Light blue header background */
                color: #fff;
                text-align: center;
                padding: 20px;
              }
        
              .content {
                padding: 20px;
                text-align: center;
              }
        
              .footer {
                text-align: center;
                background-color: #f0f5fc; /* Light blue footer background */
                padding: 10px;
              }
        
              .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #3498db; /* Light blue button background */
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
              }
        
              a {
                color: #3498db; /* Light blue link color */
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to DOS</h1>
                <p>We're excited to have you with us!</p>
              </div>
              <div class="content">
                <h2>Hello, ${user.username}!</h2>
                <p>
                  Welcome to DOS! We're thrilled to welcome you as a new member of our
                  company. This is your first step toward exciting opportunities and
                  valuable experiences.
                </p>
                <p>
                  To get started, please verify your email address. Click the button
                  below to verify your email and join our community.
                </p>
                <a
                  href="https://backend.dosshs.online/api/verify/email?token=${verificationToken}"
                  class="button"
                  >Verify Email</a
                >
              </div>
              <div class="footer">&copy; 2023 DOS</div>
            </div>
          </body>
        </html>           
            `,
    };
    transporter.sendMail(mailOptions, () => {
      return res.status(200).json({
        message: "Email sent successfully",
        verificationToken: verificationToken,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const sendAccountVerificationMail = async (req, res) => {
  const { userId } = req.params;
  try {
    const verificationToken = createVerificationToken(3);
    const verificationTokenExpiry = new Date(
      new Date().getTime() + 5 * 60 * 1000
    );

    const user = await User.findByIdAndUpdate(
      userId,
      {
        verificationToken: verificationToken,
        verificationTokenExpiry: verificationTokenExpiry,
      }, // New data to set
      { new: true } // Return the updated document
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // true for SSL, false for TLS
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    const mailOptions = {
      from: {
        name: "DOS",
        address: process.env.ZOHO_USER,
      },
      to: user.email,
      subject: "Verification code to reset your DOS password",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Inline CSS for email compatibility */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f0f5fc; /* Light blue background */
            }
      
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 5px;
            }
      
            .header {
              background-color: #3498db; /* Light blue header background */
              color: #fff;
              text-align: center;
              padding: 20px;
            }
      
            .content {
              padding: 20px;
              text-align: center;
            }
      
            .footer {
              text-align: center;
              background-color: #f0f5fc; /* Light blue footer background */
              padding: 10px;
            }
      
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #3498db; /* Light blue button background */
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
      
            a {
              color: #3498db; /* Light blue link color */
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verification Code for DOS</h1>
              <h3>Hi ${user.username}!</h3>
            </div>
            <div class="content">
              <h2>${user.verificationToken}</h2>
              <p>To reset your password enter the above code.</p>
              <p>
                If you did not request to change your password secure your account
                immediately by changing your password on <a href="dosshs.online/settings">DOS</a>.
              </p>
            </div>
            <div class="footer">&copy; 2023 DOS</div>
          </div>
        </body>
      </html>
      `,
    };
    transporter.sendMail(mailOptions, async () => {
      return await res.status(200).json({
        message: "Email sent successfully",
        verificationToken: verificationToken,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

module.exports = {
  sendEmailVerificationMail,
  sendAccountVerificationMail,
};
