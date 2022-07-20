const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const CLINET_ID = '1055646486791-bvbdmso22idg5c3evb9ubmpt6o5if990.apps.googleusercontent.com';
const CLINET_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04CbFv0qBFy3uCgYIARAAGAQSNwF-L9Irh4d4XHooMSdUDd32dyA214u5S3H-H1jII4y-SmGwOfkiQ9Cu1b0U88GoCo4mUO3xItQ'

const oAuth2Client = new google.auth.OAuth2(CLINET_ID, CLINET_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })


module.exports = async (user, todo) => {

    try {
        const accessToken = await oAuth2Client.getAccessToken();

        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'akgupta.02001@gmail.com',
                clientId: CLINET_ID,
                clientSecret: CLINET_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        let mailOptions = {
            from: 'akgupta.02001@gmail.com',
            to: user.email,
            subject: 'New Todo Created',
            text: `New todo task  "${todo.title}" created at time : ${todo.startTime} which is going to expiry in ${todo.expiry} minutes. To Do any changes please visit this link http://localhost:3000/${todo.taskId}. Thankyou Have a good day `

        }

        const result = await transport.sendMail(mailOptions);
        return result

    } catch (error) {
        return error
    }
}