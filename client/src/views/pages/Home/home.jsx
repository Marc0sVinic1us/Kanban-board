
import { React, useState, useEffect } from 'react';
import { DragDropContext } from "react-beautiful-dnd"

import "./home_style.css"
import "../../../styles/global.css"

import Navbar from "../../components/Navbar/navbar.jsx";
import ContainerCreateCard from "../../components/ContainerCreateCard/containerCreateCard.jsx";
import ContainerViewCard from '../../components/ContainerViewCard/containerViewCard.jsx';
import Board from '../../components/Board/board.jsx';

import createIcon from "../../../assets/svg/create-icon.svg"

function Home() {
    
    const [popUpVisible, setPopupVisible] = useState(false);
    const [refreshTasks, setRefreshTasks] = useState(false);
    const [popupTask, setPopupTask] = useState(false);
    const [taskCards, setTaskCards] = useState([]);
    const [taskDataView, setTaskDataView] = useState(null);

    let refreshTasksController = (refreshTasks ? taskCards : "");

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
                    alert("Sessão expirada, favor se autenticar novamente")
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
    
    }, [refreshTasksController]);
    
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

    function reorder(arr, startIndex, endIndex) {
        const result = Array.from(arr);
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const handleDropTask = (result) => {
        
        if(!result.destination) {
            return;
        }

        const tasks = reorder(taskCards, result.source.index, result.destination.index)
        setTaskCards(tasks)
    
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

                <img className='btn-createTask' title="Criar nova tarefa" onClick={handleCreateTask} src={createIcon} alt="Criar tarefa" />

                <div className="boards">

                    <DragDropContext onDragEnd={handleDropTask}>

                        <Board 
                            boardName="TO DO"
                            taskCards={taskCards}
                            setPopupTask={setPopupTask}
                            setTaskDataView={setTaskDataView}
                        />
                        
                        <Board 
                            boardName="DOING"
                            taskCards={taskCards}
                            setPopupTask={setPopupTask}
                            setTaskDataView={setTaskDataView}
                        />
                        
                        <Board 
                            boardName="DONE"
                            taskCards={taskCards}
                            setPopupTask={setPopupTask}
                            setTaskDataView={setTaskDataView}
                        />
                    
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}

export default Home;