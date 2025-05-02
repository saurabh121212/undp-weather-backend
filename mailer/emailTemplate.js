const RTRRejectedEmailTemplate = (payload) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>

    <p>We regret to inform you that your plastic return, filed for this month has been rejected
    by EEA.<p>
    Comments, if any, by EEA:<br> 
    ${payload.admin_comments}
    <p> We request you to log into the plastic return filing system and revise your return for
    this month.</p>
    <b> Regards, </b> <br>
    EEA System Admin
    <br><br>
    <b> Eswatini Environment Authority </b><br>
    RHUS Office Park<br>
    Karl Grant Street<br>
    Mbabane<br>
    Eswatini<br>
    Email: systems@eea.org.sz <br>
    Tell: +268 2404 6960/7893 <br>
    Cell: +268 7854 6907 or 7806 1658 <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`




const RTRApprovedEmailTemplate = (payload) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>

    <p>We are pleased to inform you that your plastic return filed for this month has been approved by EEA.<p>
    Comments, if any, by EEA:<br> 
    ${payload.admin_comments}
    <p> We thank you for your support.</p>
    <b> Regards, </b> <br>
    EEA System Admin
    <br><br>
    <b> Eswatini Environment Authority </b><br>
    RHUS Office Park<br>
    Karl Grant Street<br>
    Mbabane<br>
    Eswatini<br>
    Email: systems@eea.org.sz <br>
    Tell: +268 2404 6960/7893 <br>
    Cell: +268 7854 6907 or 7806 1658 <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`


// Ragistration Email Hospital
const ragistrationEmailHospital = (payload) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>
    <b>Verification code</b>
    <p>Please use the verification code below to verify your account</p> 
    <b>OTP - ${payload}</b><br><br><br>

    <b> Regards, </b> <br>
    Eswatini Meteorological Service
    <br><br>
    <b> Eswatini Meteorological Service </b><br>
    Email: To be added later<br>
    Tell: To be added later<br>
    Cell: To be added later<br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`


// Ragistration Email Nurse
const ragistrationEmailNurse = (payload) =>
`<html>
<head>
<title></title>
</head>
<body>
<!-- Take only this part for email -->

<b>Dear ${payload.nurses_first_name},</b> <br>
<p>We are pleased to inform you that you have successfully registered with the EDEFS Image Management and Reporting portal as a nurse.</p> 
<p> Please use the following credentials to logIn into the system.</p>
Email ID - ${payload.nurses_email_id}<br>
Password - ${payload.password}<br><br>
<b> Regards, </b> <br>
Ministry of Health Kingdom of Eswatini
<br><br>
<b> Ministry of Health Kingdom of Eswatini </b><br>
To be added later<br>
Email: To be added later<br>
Tell: To be added later<br>
Cell: To be added later<br>
<br><br><br>
<p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
</body>
</html>`


// Ragister User Apprvle
const resetPasswordRequest = (payload, email) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>
    <p>We recives your reset password request click on the below link to reset your password</p> 
    <br>
    <a href="${process.env.APP_URL}resetpassword?token=${payload.token}">Click Hear to Reset Password</a>
    <br> <br>
    <b> Regards, </b> <br> 
    Ministry of Health Kingdom of Eswatini
    <br><br>
    <b> Ministry of Health Kingdom of Eswatini
    </b><br>
    RHUS Office Park<br>
    Karl Grant Street<br>
    Mbabane<br>
    Eswatini<br>
    Email: systems@eea.org.sz <br>
    Tell: +268 2404 6960/7893 <br>
    Cell: +268 7854 6907 or 7806 1658 <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`


// Password Sussesfully Reset Email
const passwordReseted = (payload, email) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>
    <p>Your Password is successfully resened try to login with the new password know</p> 
    <br>
    <br> <br>
    <b> Regards, </b> <br> 
    Ministry of Health Kingdom of Eswatini
    <br><br>
    <b> Ministry of Health Kingdom of Eswatini
    </b><br>
    RHUS Office Park<br>
    Karl Grant Street<br>
    Mbabane<br>
    Eswatini<br>
    Email: systems@eea.org.sz <br>
    Tell: +268 2404 6960/7893 <br>
    Cell: +268 7854 6907 or 7806 1658 <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`



// Ragister User Apprvle
const userApprovedEmailTemplate = (payload, email) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>
    <p>We are pleased to inform you that your registration request has been approved.</p> 
    <b> Regards, </b> <br>
    EEA System Admin
    <br><br>
    <b> Eswatini Environment Authority </b><br>
    RHUS Office Park<br>
    Karl Grant Street<br>
    Mbabane<br>
    Eswatini<br>
    Email: systems@eea.org.sz <br>
    Tell: +268 2404 6960/7893 <br>
    Cell: +268 7854 6907 or 7806 1658 <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`



const userRejectedEmailTemplate = (payload, email) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>
    <p>We regret to inform you that your registration request was not accepted. Please
    contact the system admin to understand why your request was rejected.</p> 
    <b> Regards, </b> <br>
    EEA System Admin
    <br><br>
    <b> Eswatini Environment Authority </b><br>
    RHUS Office Park<br>
    Karl Grant Street<br>
    Mbabane<br>
    Eswatini<br>
    Email: systems@eea.org.sz <br>
    Tell: +268 2404 6960/7893 <br>
    Cell: +268 7854 6907 or 7806 1658 <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`



// This is use to send email to the admin at the time of new user ragistration 
const userRagistrationRequestTemplate = (payload) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
    <b>Dear EEA Admin,</b> <br>
    <p>A user has submitted a request for registration. Please log into the ‘Plastic Return’ filing system to review this request.</p> 
    <br>
    <b>Note: </b>This is a system generated message, please do not reply to this email.<br>
    </body>
    </html>`



// This is use to send email to the admin at the time of new user RTR fill by user 
const rTRFillByUserTemplate = (payload) =>
`<html>
<head>
<title></title>
</head>
<body>
<!-- Take only this part for email -->
<b>Dear EEA Admin,</b> <br>
<p>A registered business has submitted their monthly plastic return. Please log into the ‘Plastic Return’ filing system to process this return.</p> 
<br>
<b>Note: </b>This is a system generated message, please do not reply to this email.<br>
</body>
</html>`
    


// This is a Manager Email Template.
const managerEmailTemplate = (payload) =>
    `
   <!DOCTYPE html>
   <html>
   
   <head>
       <title></title>
   </head>
   
   <body>
       <!-- Take only this part for email -->    
       <table style="width: 720px; font-family: Arial, Helvetica, sans-serif; ">
           <tr>
               <td colspan="2" style="text-align: center;padding: 12px; border-bottom: 1px solid #ccc;">Leave Application
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                       Employee name
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                       ${payload.leave_apply_by_name}
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Leave Type
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.leave_type}
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Date of application
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.created_at} 
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Leave duration
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.start_date} to ${payload.end_date}
                   </div>
               </td>
           </tr>

           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Number of working days
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.number_of_days}
                   </div>
               </td>
           </tr>

           <tr>
           <td style="width: 50%; vertical-align: top;">
               <div style=" margin-left: 10px; padding: 10px; ">
               Employee Comments
               </div>
           </td>
           <td style="vertical-align: top;">
               <div style=" margin-left: 10px; padding: 10px;">
               ${payload.leave_apply_by_comments}
               </div>
           </td>
          </tr>

           <tr>
               <td>
                   <a href="http://10.0.10.105/report/leave-requests">
                       <button type="button"
                           style="border: 0px; background:lightgreen; width: 100%; height: 40px; text-transform: uppercase;">
                           Approve
                       </button>
                   </a>
               </td>
               <td>
                   <a href="http://10.0.10.105/report/leave-requests">
                       <button type="button"
                           style="border: 0px; background:lightcoral; width: 100%; height: 40px; text-transform: uppercase;">
                           Reject
                       </button>
                   </a>
               </td>
           </tr>
       </table>
   </body>
   
   </html>
   `



module.exports = {
    ragistrationEmailHospital,
    ragistrationEmailNurse,
    resetPasswordRequest,
    passwordReseted,

    RTRRejectedEmailTemplate,
    RTRApprovedEmailTemplate,
    
    
    userApprovedEmailTemplate,
    userRejectedEmailTemplate,
    userRagistrationRequestTemplate,
    rTRFillByUserTemplate
}