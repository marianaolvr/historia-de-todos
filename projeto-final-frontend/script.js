const botao = document.querySelector('.btnEnviar')
botao.addEventListener("click", enviarEmail)
function enviarEmail () {
  const nomeCompleto = document.querySelector(".inputNomeCompleto").value
  const instituicaoEnsino = document.querySelector(".inputEscola").value
  const endereco = document.querySelector(".inputEndereco").value
  const email = document.querySelector(".inputEmail").value
  const reclamacao = {
    nomeCompleto, instituicaoEnsino, endereco, email
  }

  
  fetch(
    'http://localhost:3000/reclamacoes/send-email',
    {
      method: 'POST',
      body: JSON.stringify(reclamacao),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => console.log("criou!"))
}



