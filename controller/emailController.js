const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();

router.post('/email', async (req, res) => {

    const { username, email, passwor } = req.body;

    // console.log(username, email, passwor);
    // return;
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // user: 'donotreply12343@gmail.com',
                // pass: 'thisisafakeaccount'
                user: 'donotreply12343@gmail.com',
                pass: 'jkdvfhatpycrsfja'
            }
        });
    
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Team FLT" <donotreply12343@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Admin Request Approved", // Subject line
            // text: "", // plain text body
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Admin Access Granted</title>
            </head>
            <body>
                <p>Dear ${username},</p>
                
                <p>Your request for admin access to the Flashcards platform has been approved. You are now required to log in with the below given credentials and fulfill your responsibilities and ensure the effective management of the platform for the betterment of the company.</p>
                
                <p>username: ${username}<br>
                password: ${passwor}</p>

                <p>Please make sure to adhere to all company policies and guidelines in performing your duties. If you require any assistance, feel free to reach out.</p>

                <p>Best regards,<br>
                Team FLT<br>
            </body>
            </html>
            `,
        });
    
        // console.log("Message sent: %s", info.messageId);
        // // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        // console.log(info.json);
        // return;

        res.status(200).send("Message sent: %s", info.messageId, "info.json = ", info.json);
    
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send('Error sending email');        
    }
    
});


module.exports = router;
