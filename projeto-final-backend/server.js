const express = require('express')
const server = express()
const controller = require('./ReclamacoesController') //é maiusculo?
const PORT = 3000

server.get('/', (request, response) => {
    response.send('Olá, mundo!')
  })

server.post("/reclamacoes", async (request, response) =>{
    response.send()
    .then
})

server.get("/reclamacoes/enviar", async (request, response) => {
    response.send(200)
    .then
})



server.listen(PORT)
console.info(`Rodando na porta ${PORT}`)