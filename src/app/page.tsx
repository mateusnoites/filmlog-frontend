"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
        router.push("/login");
        }
    }, []);

    function handleSair() {
        localStorage.setItem("token", "");
        router.push("/login");
    }

    return (
        <div>
            <h1>Bem-vindo!</h1>
            <button onClick={handleSair} className="mt-15 px-10 font-bold text-md cursor-pointer botao-hover bg-azul text-white sombras border-3 border-black rounded-md h-10">Sair</button>
        </div>
    )
}