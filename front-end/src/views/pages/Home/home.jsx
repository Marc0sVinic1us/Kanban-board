
import { React, useState, useEffect } from 'react';

import "./home_style.css"
import "../../../styles/global.css"

import Navbar from "../../components/Navbar/navbar.jsx";
import ContainerCreateCard from "../../components/ContainerCreateCard/containerCreateCard.jsx";
import TaskCard from '../../components/TaksCard/taskcard.jsx';

function Home() {
    
    const [popUpVisible, setPopupVisible] = useState(false);
    const [taskCards, setTaskCards] = useState([]);

    useEffect(() => {
        
        const formdata = new FormData();
        const userID = sessionStorage.getItem("userID")
        const token = sessionStorage.getItem("token")

        formdata.append("userID", [userID])
        
        fetch("http://localhost:5000/showTasks", {
            method: 'POST',
            body: formdata,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(response => response.json())
        .then(data => {
    
            setTaskCards(data);
        
        })
        .catch(err => console.error(err))
    
    }, [taskCards]);
    
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
            /> 

            <div className="home-container">

                <button className="btn-createTask" title="Criar nova tarefa" onClick={handleCreateTask}>+</button>

                <div className="boards">

                    <aside>
                        <h3>TO DO</h3>
                        <section>
                            
                            { taskCards !== null && taskCards !== undefined ?

                                taskCards.map(task => (                                
                                    
                                    <TaskCard 
                                        key={task.key}
                                        taskname={task.taskname}
                                        taskdescription={task.taskdescription}
                                        taskpriority={task.taskpriority}
                                    />
                                
                                ))
                                : ""
                            }
                        
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