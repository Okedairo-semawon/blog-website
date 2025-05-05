// import { mailtrapClient, sender } from "../utils/email.config.js";
// import {VERIFICATION_EMAIL_TEMPLATE} from "../utils/emailTemplate.js"
// export const sendVerificationEmail = async ({email, verificationToken}) => {
//     // const recipient = [{ email }];
//     try {
//         const response = await mailtrapClient.send({
//             from: sender,
//             to: [{email: 'okedairosemawon@gmail.com '}],
//             subject:  " Verify your email",
//             html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
//             category:" verification email"
            
//         })
//         console.log("Email sent successfully", response)
//     } catch(error){
//         console.log("Error sending emails", error);
//         throw new Error(`Error sending email: ${error}`) 
//     }   
// }