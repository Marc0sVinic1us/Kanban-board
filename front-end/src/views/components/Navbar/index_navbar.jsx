
import "./navbar_style.css"

function Navbar() {

    const token = sessionStorage.getItem("token");

    const handleLogout = () => {
        
        // Limpa cookies
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("useremail");
        sessionStorage.removeItem("userID");
        
        window.location.reload();
    }

    const firstUserName = sessionStorage.getItem("username").split(" ")[0]

    return (
        
        <nav className="navbar">

            <h1 className="app-name">Kanban Board</h1>

            <h4>Olá {firstUserName}!</h4>
            
            { token && token !== "" && token !== undefined ? 
                
                <button className="btn-logActions" title="Encerrar sessão" onClick={ handleLogout }>Sair</button>
             : 
                <button className="btn-logActions">Entrar</button>
            }
        
        </nav>
    )
}

export default Navbar;
