
import React, { useState } from 'react';

import "./home_style.css"
import "../../../styles/global.css"

import Navbar from "../../components/Navbar/index_navbar";
import ContainerCreateCard from "../../components/ContainerCreateCard/containerCreateCard_index";
// import Board from "../../components/Board/index_board";

function Home() {
    
    const [popUpVisible, setPopupVisible] = useState(false);
    
    const token = sessionStorage.getItem("token")
    
    if (token === undefined || token === null) {
        window.location.href = "/";
    }    

    const handleCreateTask = () => {
        setPopupVisible(true);   
    }

    return (


        <div className="body-container">
            
            <Navbar />
            
            <ContainerCreateCard 
            trigger={popUpVisible} 
            setTrigger={setPopupVisible}
            >   
            </ContainerCreateCard>


            <div className="home-container">

                <button className="btn-createTask" title="Criar nova tarefa" onClick={handleCreateTask}>+</button>

                <div className="boards">

                    {/* <Board 
                        header={"TO DO"}
                    />
                    
                    <Board 
                        header={"DOING"}
                    />
                    
                    <Board 
                        header={"DONE"}
                    />
                    */}

                    <aside>
                        <h3>TO DO</h3>
                        <section>
                            
                            <div className="task-card">
                                <h4>Dar banho no peixe</h4>
                                <small>Usar toalha do banheiro</small>    
                            </div>
                            
                            <div className="task-card">
                                <h4>Tarefa facul</h4>
                                <small>Seguir anotações do caderno</small>    
                            </div>
                            
                            <div className="task-card">
                                <h4>Limpar quarto</h4>
                                <small></small>    
                            </div>
                        
                        </section>
                    </aside>

                    <aside>
                        <h3>DOING</h3>
                        <section>
                        </section>
                    </aside>

                    <aside>
                        <h3>DONE</h3>
                        <section>
                        </section>
                    </aside>
                    
                </div>
            </div>
        
        </div>
    )
}

export default Home;