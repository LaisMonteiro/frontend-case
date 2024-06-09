import { Link } from "react-router-dom";
import "./index.css";

export default function NotFoundPage() {
  return (
    <div className="container">
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <br />
      <Link to="/" className="redirect">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}
