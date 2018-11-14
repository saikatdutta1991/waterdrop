const nodemailer = require('nodemailer');
const appConfig = require('../configs/app')

/** create reusable transporter object using the default SMTP transport */
let transporter = nodemailer.createTransport(appConfig.email);


/** mailer class definition */
class Mailer {

    constructor() {
        this.transporter = transporter
    } //not required for now

    /** 
     * this method sends email
     * ishtml is boolean (defines mail body is html or plain text)
     * to is array of strings (contains array of email ids)
     * subject is string
     * body is string
     */
    async sendMail(isHtml, to, subject, body) {

        /** check to is array else return false */
        if (!Array.isArray(to)) {
            return false;
        }

        /** setup email data with unicode symbols */
        let mailOptions = {
            from: `${appConfig.email.from.name} <${appConfig.email.from.email}>`, // sender address
            to: to.join(', '), // list of receivers
            subject: subject, // Subject line
        }

        /** adding html or plain text as body based on isHtml boolean */
        if (isHtml) {
            mailOptions.html = body
        } else {
            mailOptions.text = body
        }

        // send mail with defined transport object
        return await this.transporter.sendMail(mailOptions);

    }

}



module.exports = new Mailer()


/** example how to send email from controller */
/* 
    require('../helpers/mailer')
    .sendMail(true, ['saikatdutta1991@gmail.com'], 'Subject', 'Body: Hello World').catch(function (error) {
        console.log('error', error)
        res.send('error')
    }).then(function (info) {
        console.log(require('nodemailer').getTestMessageUrl(info))
        console.log('info', info)
        res.send('done')
    }) 
*/