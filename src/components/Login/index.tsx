import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import logoFullImage from "../../assets/logo-full.svg";
import arrowRightImage from "../../assets/arrow-right.svg";
import "./index.css";

function Login() {
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasError, setHasError] = useState<string>();

  const navigate = useNavigate();

  const handleChangeCPF = (value: string) => {
    setCpf(value);

    setHasError(undefined);
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);

    setHasError(undefined);
  };

  const login = async (cpf: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth",
        {
          cpf,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleAuth = async () => {
    if (!cpf) {
      return setHasError("Preencha seu e-mail ou CPF");
    }

    if (!password) {
      return setHasError("Preencha sua senha");
    }

    try {
      const loginData = await login(cpf, password);

      if (loginData) {
        navigate("/list");
      }
    } catch (err) {
      setHasError("Senha ou usuário incorreto");
    }
  };

  return (
    <div className="login">
      <img src={logoFullImage} alt="Cora" title="Cora" />
      <h1>Fazer Login</h1>
      <input
        id="cpf"
        placeholder="Insira seu e-mail ou CPF"
        onChange={(e) => handleChangeCPF(e.target.value)}
      />
      <input
        id="password"
        placeholder="Digite sua senha"
        onChange={(e) => handleChangePassword(e.target.value)}
      />
      <button onClick={handleAuth}>
        Continuar
        <img src={arrowRightImage} />
      </button>
      <br />

      {hasError && <small>{hasError}</small>}
    </div>
  );
}

export default Login;
