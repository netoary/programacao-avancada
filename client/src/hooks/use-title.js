import { useEffect } from "react";

export default function useTitle(title = "Carregando..") {
    useEffect(() => {
        document.title = `Processa Processos - ${title}`;
    }, [title]);
}
