async function procuraDados(email, password, arr) {
  const response = await fetch("http://localhost:4000/users");
  const dados = await response.json();
  let erroEmail = document.querySelector(".erro-email");
  let erroPassword = document.querySelector(".erro-password");
  let role = ""

  for (let dado of dados) {
    if (dado.email === email && dado.password === password) {
      role = dado.role // confirmar se está levando pro controller
      erro.innerHTML = "";
      return role;
    } else if ( dado.email != email ) {
      erroEmail.innerHTML = "E-mail não encontrado";
    } else if ( dado.password != password ) {
      erroPassword.innerHTML = "Senha incorreta";
    } else {
      console.log("Ocorreu um erro");
    }
  }

  if (erro.innerHTML.length > 0) {
    arr.push(...["erroDadosLogin"]);
  }
}

export default procuraDados;
