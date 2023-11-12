
import { React, useState, useEffect } from 'react';

import "./home_style.css"
import "../../../styles/global.css"

import Navbar from "../../components/Navbar/navbar.jsx";
import ContainerCreateCard from "../../components/ContainerCreateCard/containerCreateCard.jsx";
import ContainerViewCard from '../../components/ContainerViewCard/containerViewCard.jsx';
import TaskCard from '../../components/TaksCard/taskcard.jsx';

function Home() {
    
    const [popUpVisible, setPopupVisible] = useState(false);
    const [refreshTasks, setRefreshTasks] = useState(false);
    const [popupTask, setPopupTask] = useState(false);
    const [taskCards, setTaskCards] = useState([]);
    const [taskDataView, setTaskDataView] = useState(null);

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
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/";

                } else {

                    console.error("Error: " + response.status);
                }
            } else {
                
                return response.json();
            }
        })
        .then(data => {

            setTaskCards(data);
        
        })
        .catch(err => console.error(err))
    
    }, [(refreshTasks ? taskCards : "")]);
    
    const token = sessionStorage.getItem("token")
    
    if (token === undefined || token === null) {
        window.location.href = "/";
    }    

    const handleCreateTask = () => {
        setPopupVisible(true);   
    }

    const handleRefresh = () => {
        
        if (refreshTasks) {
            setRefreshTasks(false)
            setTimeout(() => {
                setRefreshTasks(true)
            }, 100);
        
        } else {
            setRefreshTasks(true)
            setTimeout(() => {
                setRefreshTasks(false)
            }, 100);
        }
    }

    return (

        <div className="body-container">
            
            <Navbar />

            { popUpVisible ?
                <ContainerCreateCard 
                    setTrigger={setPopupVisible}
                    refreshTasks={handleRefresh}
                /> 
            : "" }

            { popupTask ? 
                <ContainerViewCard 
                    setTrigger={setPopupTask}
                    taskData={taskDataView}
                    refreshTasks={handleRefresh}
                /> 
            : ""}

            <div className="home-container">

                <button className="btn-createTask" title="Criar nova tarefa" onClick={handleCreateTask}>+</button>

                <div className="boards">

                    <aside>
                        <h3>TO DO</h3>
                        <section>
                            
                            { taskCards !== null && taskCards !== undefined && Array.isArray(taskCards) ?

                                taskCards.map(task => (                            
                                    
                                    <TaskCard 
                                        key={task.key}
                                        taskKey={task.key}
                                        taskName={task.taskname}
                                        taskDescription={task.taskdescription}
                                        taskPriority={task.taskpriority}
                                        setTriggerViewTask={setPopupTask}
                                        setTaskDataView={setTaskDataView}
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