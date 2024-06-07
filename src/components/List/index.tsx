import { useNavigate } from "react-router-dom";

export default function List() {
  // Hooks
  const navigate = useNavigate();

  // Handlers
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Painel</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
