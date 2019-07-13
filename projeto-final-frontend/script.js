const botao = document.querySelector('.btnEnviar')
botao.addEventListener("click", enviarEmail)
function enviarEmail () {
  const instituicao = document.querySelector(".inputInstituicao").value
  const endereco = document.querySelector(".inputEndereco").value
  const nome = document.querySelector(".inputNome").value
  const email = document.querySelector(".inputEmail").value
  const reclamacao = {
    instituicao, endereco, nome, email
  }
  fetch(
    'http://localhost:3000/reclamacoes/enviar',
    {
      method: 'POST',
      body: JSON.stringify(reclamacao),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => console.log("criou!"))
}
