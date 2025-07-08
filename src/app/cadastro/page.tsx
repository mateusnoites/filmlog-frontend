"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IUser {
  nome: string,
  email: string,
  senha: string
}

interface ILogin {
  email: string
  senha: string
}

interface IAuthResponse {
  message: string
  token: string,
  nome: string,
}

export default function Cadastro() {
  const [nome, setNome] = useState("");
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

    return res.json();
  }

  async function handleCreateUser(user: IUser) {
    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao cadastrar o usuário: ${response.status} - ${errorText}`);
    }
  }

  function areValidParams(nome: string, email: string, senha: string): boolean {
    const caracteresEspeciais = [
      '!', '"', '#', '$', '%', '&', "'", '(', ')', '*',
      '+', ',', '-', '.', '/', ':', ';', '<', '=', '>',
      '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|',
      '}', '~'
    ];


    if (nome == null || nome.length > 255) {
      alert("Seu nome deve ter menos de 256 caracteres")
      return false;
    } else if (email == null || email.length > 100) {
      alert("Seu email deve ter menos de 101 caracteres")
      return false;
    } else if (senha == null || senha.length > 72) {
      alert("Sua senha deve ter menos de 73 caracteres");
      return false;
    } else if(senha.length < 4 || !(caracteresEspeciais.some(char => senha.includes(char)))) {
      alert("Sua senha deve ter mais de 4 caracteres e pelo menos um caractere especial")
      return false;
    }

    return true;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const usuario: IUser = {
      nome: nome,
      email: email,
      senha: password
    }

    if(areValidParams(usuario.nome, usuario.email, usuario.senha)) {
      try {
        await handleCreateUser(usuario);
        alert("Usuário cadastrado com sucesso!")
        const token = (await handleLogin({email: usuario.email, senha: usuario.senha})).token;
        localStorage.setItem("token", token);
        router.push("/");
      } catch(err: any) {
        console.error(err.message || "Erro ao criar usuário!");
      }
    }
  }

  function handleChangeName(e: any) {
    setNome(e.target.value)
  }

  function handleChangeEmail(e:any) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e:any) {
    setPassword(e.target.value)
  }

  return (
    <div className="flex justify-between">
      <div className="w-9/10">
        <img className="h-9" src="/filmlog-logo.png" alt="Logo do Filmlog" />

        <div>
          <h1 className="font-bold text-3xl mt-6">Cadastre-se</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-sm font-bold" htmlFor="nome">Nome</label>
              <input className="bg-cinza px-3 outline-none border-black border-3 rounded-md sombras h-10" type="text" name="nome" id="nome" value={nome} onChange={handleChangeName}/>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold" htmlFor="email">E-mail</label>
              <input className="bg-cinza px-3 outline-none border-black border-3 rounded-md sombras h-10" type="email" name="email" id="email" value={email} onChange={handleChangeEmail}/>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold" htmlFor="senha">Senha</label>
              <input className="bg-cinza px-3 outline-none border-black border-3 rounded-md sombras h-10" type="password" name="senha" id="senha" value={password} onChange={handleChangePassword}/>
            </div>

            <button type="submit" className="mt-15 font-bold text-lg cursor-pointer botao-hover bg-azul text-white sombras border-3 border-black rounded-md h-13">
              Enviar
            </button>
          </form>
          <p className="mt-5 text-sm texto-cinza font-bold">
            Já tem uma conta? <Link className="link-azul" href="/login">Faça login</Link>
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
