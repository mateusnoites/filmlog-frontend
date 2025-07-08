"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ILogin {
  email: string
  senha: string
}

interface IAuthResponse {
  message: string
  token: string,
  nome: string,
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
    router.push("/");
    }
  }, []);

  const handleLogin = async (user:ILogin): Promise<IAuthResponse> => {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if(res.status == 403) {
      throw new Error(`E-mail ou senha incorretos!`);
    } else if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ao fazer login: ${res.status} - ${errorText}`);
    }

    return res.json();
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const userLogin: ILogin = {
      email: email,
      senha: password
    }

    if ((userLogin.email != null && userLogin.senha != null) && (userLogin.email.trim() != "" && userLogin.senha.trim() != "")) {
      try {
        const req = await handleLogin(userLogin);
        alert("Login realizado com sucesso!");
        localStorage.setItem("token", req.token);
        router.push("/");
      } catch(err:any) {
        alert(err.message || "Erro ao fazer login");
        setEmail("");
        setPassword("");
      }
    } else {
      alert("Preencha todos os campos para entrar")
    }
  }

  return (
    <div className="flex justify-between">
      <div className="w-9/10">
        <img className="h-9" src="/filmlog-logo.png" alt="Logo do Filmlog" />

        <div className="mt-15">
          <h1 className="font-bold text-3xl mt-6">Entrar</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-sm font-bold" htmlFor="email">E-mail</label>
              <input value={email} onChange={(e:any) => {setEmail(e.target.value)}} className="bg-cinza px-3 outline-none border-black border-3 rounded-md sombras h-10" type="email" name="email" id="email" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold" htmlFor="senha">Senha</label>
              <input value={password} onChange={(e:any) => {setPassword(e.target.value)}} className="bg-cinza px-3 outline-none border-black border-3 rounded-md sombras h-10" type="password" name="senha" id="senha" />
            </div>

            <button type="submit" className="mt-15 font-bold text-lg cursor-pointer botao-hover bg-azul text-white sombras border-3 border-black rounded-md h-13">
              Enviar
            </button>
          </form>
          <p className="mt-5 text-sm texto-cinza font-bold">
            Não tem uma conta? <Link className="link-azul" href="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <img src="/imagens-filmlog.png" alt="Pôsteres de filmes"
          className="h-130"
        />
      </div>
    </div>
  );
}
