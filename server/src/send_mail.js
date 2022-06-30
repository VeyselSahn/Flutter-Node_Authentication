var nodemailer = require("nodemailer");//Nodemailer modülünü kurduktan sonra projeye dahil etme

module.exports = { sendMail, prepareMail };

let mail = '@gmail.com';
let pass = '';

var transfer = nodemailer.createTransport({
    service: "gmail",//gönderen mailin kullandığı servis
    secure: true,
    auth: {//gönderecek kişinin mail bilgileri
        user: mail,
        pass: pass
    }
});


function prepareMail(to, subject, text) {
    return {
        from: mail,//Gönderecek kişinin mail adresi
        to: to,//Gönderilecek kişinin mail adresi
        subject: subject,//Gönderecek mailin konusu
        text: text,//Gönderecek mailin içeriği
        /*html:"<form><input type='text'><br><input type='submit'></form>"*/ //Ayrıca HTML göndermek istenilirse kullanımı
    };
}
function sendMail(mail) {
    transfer.sendMail(mail, function (error) {//Mail gönderme işlemi
        if (error) console.log(error);
        else console.log("Mailiniz gönderildi!");
    });
}
