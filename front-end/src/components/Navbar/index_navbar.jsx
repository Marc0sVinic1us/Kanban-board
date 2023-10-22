
import "./navbar_style.css"

function Navbar() {

    const token = sessionStorage.getItem("token");

    const handleLogout = () => {
        
        // Limpa cookies
        sessionStorage.removeItem("token");
        window.location.reload();
    }

    return (
        
        <nav className="navbar">
            <h1 className="app-name">Kanban Board</h1>
            
            { token && token !== "" && token !== undefined ? 
                
                <button className="btn-logActions" title="Encerrar sessão" onClick={ handleLogout }>Sair</button>
             : 
                <button className="btn-logActions">Entrar</button>
            }
        
        </nav>
    )
}

export default Navbar;
