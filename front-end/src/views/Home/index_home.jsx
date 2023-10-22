
import "./home_style.css"

import Navbar from "../../components/Navbar/index_navbar";

function Home() {

    const token = sessionStorage.getItem("token")
    
    if (token === undefined || token === null) {
        window.location.href = "/";
    }    

    const handleCreateTask = () => {

        const token = sessionStorage.getItem("token");

        const opts = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        // Enviando requisição para o back-end com token de acesso
        fetch("http://localhost:5000/createTask", opts)
            
            .then(response => response.json())
            .then(data => {

                alert(data.message)
            })
    }

    return (

        <div className="body-container">
            
            <Navbar />

            <div className="home-container">
                <button className="btn-createTask" title="Criar nova tarefa" onClick={handleCreateTask}>+</button>
            </div>
        
        </div>
    )
}

export default Home;