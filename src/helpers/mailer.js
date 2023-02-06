/* eslint-disable no-undef */
const nodemailer = require("nodemailer");

const sendGmail = async(email, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
  
    // const options = {
    //   from: process.env.MAIL_USERNAME,
    //   to: email,
    //   subject: `Verification Account`,
    //   text: `This is your OTP code ${subject} you can go back to Izdihar Website`
    // }
  
    let info = await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: `Verification Account`,
      text: `This is your OTP code ${subject} you can go back to Izdihar Website to login`
    })
    console.log('email sent');
    console.log(info.response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {sendGmail}