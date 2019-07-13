const express = require('express')
const server = express()
const controller = require('./reclamacoesController')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require("nodemailer")
const PORT = 3000

server.use(cors())
server.use(bodyParser.json())

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