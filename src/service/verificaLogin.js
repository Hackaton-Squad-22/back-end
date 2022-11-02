class VerificacaoLogin {

  static verificaEmail = (email, arr) => {
    var emailFormato = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let erro = document.querySelector(".erro-email"); // Colocar uma div de erro no front
    if (email.trim() === "") {
      erro.innerHTML = "Digite o e-mail de cadastro";
      arr.push("erro-email-vazio")
    }
    if (email.match(emailFormato)) {
      erro.innerHTML = ""
      return true
    } else {
      erro.innerHTML = "Digite um e-mail válido"
      arr.push(...[`erro-email-formato`])
    }
  };
  
  static verificaSenha = (senha, arr) => {
    let erro = document.querySelector(".erro-senha"); // Colocar uma div de erro no front
    if (senha.trim() === "") {
      erro.innerHTML = "Digite a senha";
      arr.push('erro-senha-vazia')
    } else {
      erro.innerHTML = ""
    }
  };
}

export default VerificacaoLogin