const express = require('express')
const server = express()
const controller = require('./reclamacoesController')
const bodyParser = require('body-parser')
const cors = require('cors')
const mailer = require('nodemailer');
const PORT = 3000

server.use(cors())
server.use(bodyParser.json())


const config = {
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a0b56f4fe79fbd",
    pass: "5e77fa584b8f8a",
  }
};

const transporter = mailer.createTransport(config);


server.post("/reclamacoes/send-email", (request, response) =>{
  const message = {
    from: "olvr.mariana@gmail.com",
    to: "olvr.mariana@gmail.com",
    subject: "Instituição não cumpre Lei 11.645",
    text: "lorem ipsum lorem ipsum"
  }
transporter.sendMail(message, (error, info) =>{
  if (error){
    return response.status(400).send(error)
  }
  return response.status(200).end();
})

});

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

server.listen(PORT)
console.info(`Rodando na porta ${PORT}`)