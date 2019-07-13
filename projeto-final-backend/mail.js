var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    host: "smtp.teudominio.co.ao",
    port: 465,
    secure: true,
    auth: {
        user: "voce@teudominio.com",
        pass: "tuapassword"
   }
});
var mailOptions = {
    from: "mariana@consultorjuridico.com.br",
    to: "olvr.mariana@gmail.com",
    subject: "Nodejs — Teste para o tutorial",
    text: "O teste foi efectuado com sucesso"
}
transporter.sendMail(mailOptions, function(err, info){
    if(err){
        console.log(err);
    }else{
        console.log("Mensagem enviada com sucesso");
    }
});