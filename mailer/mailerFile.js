const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemplate')
const CONFIG     = require("../config/config");

// Email id :- metweatherapplication@gmail.com
// Password :- Saurabh@123

    let subject;
    let output;

async function sendEmail(payload,status,email) {

    console.log("payload",payload);

    if(status==1)
    {
         subject = `Eswatini Meteorological Service Early Warning System – OTP Verification`
         output = emailTemplate.ragistrationEmailHospital(payload);
    }
    if(status==2)
    {
         subject = `Success! You have been registered with the EDEFS Image Management and Reporting portal`
         output = emailTemplate.ragistrationEmailNurse(payload);
    }
    if(status==3)
    {
         subject = `Request For Reset Password`
         output = emailTemplate.resetPasswordRequest(payload);
    }

    if(status==4)
    {
         subject = `Reset Password Successfully`
         output = emailTemplate.passwordReseted(payload);
    }

    // else if(status == 2)
    // {
    //     const RTRStatus = payload.approval_status == 2 ? "Approved" : "Rejected"       
    //     if(payload.approval_status == 2)
    //     {
    //         subject = `Eswatini Environment Authority – Plastic Return Filing System – Plastic Return ${RTRStatus}`
    //         output = emailTemplate.RTRApprovedEmailTemplate(payload);
    //     }
    //     else if(payload.approval_status == 3)
    //     {
    //         subject = `Eswatini Environment Authority – Plastic Return Filing System – Plastic Return ${RTRStatus}`
    //         output = emailTemplate.RTRRejectedEmailTemplate(payload);
    //     }
    // }
   
    let transporter = nodemailer.createTransport(CONFIG.mail)
   
    message = {
        from: CONFIG.mail_from,
        to: email,
        subject: subject,
        html: output
    } 

    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
            return 0;
        } else {
            console.log('Email sent: ' + info.response);
            console.log(message.from ," ttt ", message.to);
            return 1;
        }
    });
}

module.exports = sendEmail;