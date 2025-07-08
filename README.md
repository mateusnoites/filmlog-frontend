# 🎬 Filmlog — Frontend

O **Filmlog** é uma aplicação web para organização e acompanhamento de filmes que você pretende assistir. Este repositório contém o código-fonte do **frontend**, desenvolvido em **Next.js** com **TypeScript**.

---

## 📚 Sobre o projeto

A proposta do Filmlog é fornecer uma interface simples para você montar sua lista de filmes, acompanhar o progresso e explorar novos títulos. O app também possui integração com autenticação baseada em **JWT**.

O projeto foi desenvolvido por **Mateus Dias Oliveira** como prática de aprendizado em desenvolvimento fullstack e será evoluído com novas funcionalidades.

---

## 🚀 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Integração com API Spring Boot via JWT](https://github.com/mateusnoites/filmlog-api)

---

## 🔐 Autenticação

A autenticação é feita via **JWT**. O token é armazenado no `localStorage` após o login e enviado no header de cada requisição autenticada:

```
Authorization: Bearer seu_token_jwt
```

Rotas protegidas (como a página inicial `/`) redirecionam para `/login` se o usuário não estiver autenticado.

---

## 📦 Instalação e execução

1. **Clone o repositório:**

```bash
git clone https://github.com/mateusnoites/filmlog-frontend.git
cd filmlog-frontend
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure a URL da API:**

Crie um arquivo `.env.local` com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

> Altere conforme o endereço do seu backend.

4. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

5. Acesse em: [http://localhost:3000](http://localhost:3000)

---

## 🧠 Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Armazenamento do token JWT
- ✅ Redirecionamento automático de usuários não logados
- ✅ Estilo limpo e responsivo com Tailwind
- 🔜 Gerenciamento de lista de filmes
- 🔜 Sistema de favoritos, categorias e notas

---

## 💻 Backend

O backend está disponível em [`filmlog-api`](https://github.com/mateusnoites/filmlog-api)
---

## 🧑‍💻 Autor

**Mateus Dias Oliveira**  
Graduando em Tecnologia da Informação - UFRN  
[https://github.com/mateusnoites](https://github.com/mateusnoites)