//Parte de login e cadastro
const btnEntrar = document.getElementById("btnEntrar");
const btnCadastrar = document.getElementById("btnCadastrar");
const formContainer = document.getElementById("form-container");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const btnFecharLogin = document.getElementById("btnFecharLogin");
const btnFecharCadastro = document.getElementById("btnFecharCadastro");

// Abrir o formulário de login
if (btnEntrar) {
  btnEntrar.addEventListener("click", () => {
    formContainer.style.display = "flex";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  });
}

// Abrir o formulário de cadastro
if (btnCadastrar) {
  btnCadastrar.addEventListener("click", () => {
    formContainer.style.display = "flex";
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });
}

// Fechar o formulário de login e cadastro
if (btnFecharLogin)
  btnFecharLogin.addEventListener("click", () => {
    formContainer.style.display = "none";
  });
if (btnFecharCadastro)
  btnFecharCadastro.addEventListener("click", () => {
    formContainer.style.display = "none";
  });

// formularios
const loginFormElement = document.getElementById("login-form");
const registerFormElement = document.getElementById("register-form")

// Cadastro
if (registerFormElement) {
  registerFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("registerEmail").value.trim();
    const nickname = document.getElementById("registerNickname").value.trim();
    const password = document.getElementById("registerSenha").value;

    //debug
    console.log("Cadastro:", { email, nickname, password: password ? "******" : "" });

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, nickname, password }),
      });

      const data = await response.json();
      console.log("Respsta /api/register:", response.status, data);
      alert(data.message || "Resposta do servidor");

      if(response.ok) {
        formContainer.style.display = "none";
        loginFormElement.reset();
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", err);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  });
}


//login
if(loginFormElement){
  loginFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const identifier = document.getElementById("loginIdentifier").value.trim();
    const password = document.getElementById("loginPassword").value;

    //debug
    console.log("Login:", { identifier, password: password ? "******" : "" });

    try {
      const playload = { email: identifier, nickname: identifier, password
      };
      console.log("Enviando para /api/login:", playload);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playload),
      });

      console.log("/api/login status:", response.status);

      const data = await response.json();
      console.log("Resposta /api/login:", data);

      if (response.ok) {
        alert(data.message || "Login bem sucedido");
        formContainer.style.display = "none";
        window.location.href ="conteudo-interno.html";
      }
      else {
        alert(data.message || "Erro ao Entrar.");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Erro ao fazer login. Tente novamente.");
    }
  });
}
