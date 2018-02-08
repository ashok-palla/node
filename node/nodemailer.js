const nodemailer = require('nodemailer');
const log = require('./logger/log');

const account = { "user": "ashok_palla@merilytics.com", "pass": "********" };

let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: { user: account.user, pass: account.pass }
});
module.exports.sendMail = function (receiversDetails) {
    let mailOptions = {
        from: account.user, // sender address
        to: receiversDetails.to, // list of receivers
        subject: receiversDetails.subject, // Subject line
        text: receiversDetails.text, // plain text body
        // html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) { return log.errorLog(error); }
        log.writeLog(JSON.stringify(info));
    });

}