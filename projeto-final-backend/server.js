const express = require('express')
const server = express()
const controller = require('./reclamacoesController')
const bodyParser = require('body-parser')
const cors = require('cors')
const mailer = require('nodemailer');
const PORT = 3000

server.use(cors())
// server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));




  server.get("/reclamacoes", async (request, response) => {
    controller.getAll()
  .then(listaDeReclamacoes => response.send(listaDeReclamacoes))
})

server.post("/reclamacoes/enviar", async (request, response) =>{
    controller.add(request.body)
    .then(reclamacao => {
      const _id = reclamacao._id
      response.send(_id)
    })
    .catch(error => {
      if(error.name === "ValidationError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})



server.post('/reclamacoes/send-email', function(req, res) {
  var body = req.body;
  var firstName = body.firstName;
  var lastName = body.lastName;
  var email = body.email;
  var message = body.message;

  var composedMessage = {
    text: 'Hey Person!\n\n' +
      `${firstName} ${lastName} has contacted you through your website. Here is their contact information and message: \n\n` +
      `First Name: ${firstName} \n` +
      `Last Name: ${lastName} \n` +
      `Email Address: ${email} \n` +
      `Message: ${message} \n\n`,
    subject: 'Website Inquiry'
  };

  var transporter = mailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'f2de8405dbabe3',
      pass: '824eb357956cf3' //this is a var stored in heroku, i dont recommend keeping a password string here
    }
  });

  transporter.sendMail({
    from: 'From Name <example@example.com>',
    to: 'olvr.mariana@gmail.com',
    subject: composedMessage.subject,
    text: composedMessage.text
  }, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      res.redirect('/reclamacoes');
    }
  });

});


// const config = {
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "a0b56f4fe79fbd",
//     pass: "5e77fa584b8f8a",
//   }
// };

// const transporter = mailer.createTransport(config);
// server.post("/reclamacoes/send-email", (request, response) =>{
//   const message = {
//     from: "ahistoriadetodos@gmail.com",
//     to: "olvr.mariana@gmail.com",
//     subject: "Escola que descumpre a Lei 11.645",
//     text: "lorem ipsum lorem ipsum"
//   }
// transporter.sendMail(message, (error, info) =>{
//   if (error){
//     return response.status(400).send(error)
//   }
//   return response.status(200).end();
// })
// res.redirect("/index.html");
// console.log(redirect)
// });


server.listen(PORT)
console.info(`Rodando na porta ${PORT}`)