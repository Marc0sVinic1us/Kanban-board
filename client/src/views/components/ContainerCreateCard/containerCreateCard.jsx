
import { React, useState, useEffect } from 'react';

import "./containerCreateCard_style.css"
import submitIcon from "../../../assets/svg/send-icon.svg";

import BooleanPopUp from '../BooleanPopUp/booleanPopUp';

function ContainerCreateCard(props) {

    const [ taskName, setTaskName ] = useState("");
    const [ taskDescription, setTaskDescription ] = useState("");
    const [ taskPriority, setTaskPriority ] = useState("")
    const [ taskStatus, setTaskStatus ] = useState("")
    const [ confirmationClose, setConfirmationClose ] = useState(false)

    const token = sessionStorage.getItem("token")
    const userID = sessionStorage.getItem("userID");
    
    if (token === undefined || token === null) {
        window.location.href = "/";
    } 

    const handleCreateTask = (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("userTask", [taskName, taskDescription, Number(taskPriority), userID, taskStatus]);
        
        // Enviando requisição para o back-end com token de acesso
        fetch("http://localhost:5000/createTask", {
            method: 'POST',
            body: formdata,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    alert("Sessão expirada, favor se autenticar novamente");
                    window.location.href = "/";

                } else {

                    console.error("Error: " + response.status);
                }
            } else {
                
                return response.json();
            }
        })
        .then(data => {
                        
            if (data.status) {
                props.setTrigger(false);
                props.refreshTasks();
            
                setTaskName("");
                setTaskDescription("");
                setTaskPriority("");
            
            } else {
                alert(data.message);    
            }
        })
        .catch(err => console.error(err))
    }

    let priorityColor = 'solid 2px ';
    
    if (taskPriority === '1') {
        priorityColor += 'red'
    
    } else if (taskPriority === '2') {
        priorityColor += 'orange';
    
    } else if (taskPriority === '3') {
        priorityColor += 'gold';
    
    } else if (taskPriority === '4') {
        priorityColor += 'lightgreen';
    } else {
        priorityColor += 'rgb(235, 232, 232)'
    }

    const adjustTextareaHeight = () => {
        const textarea = document.querySelector('.taskName-textarea');
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [taskName]);

    const handleAnswer = (answer) => {
        
        if (confirmationClose) {
            if (answer)
                props.setTrigger(false)
        } 
    }

    const handleConfirmationClose = () => {

        if (taskName !== "" || taskDescription !== "" || taskPriority !== "") {
            setConfirmationClose(true);
        } else {
            props.setTrigger(false)
        }
    }

    return (
        <div className='popUp-createTask'>
            <div className='popUpContent-createTask'>
                
                <button className='btnClose-createTask' title='Fechar painel' onClick={handleConfirmationClose}>X</button>
                
                <h2>Nova tarefa</h2>

                {confirmationClose ? (
                    <BooleanPopUp 
                        message={"As alterações feitas não serão salvas, tem certeza que deseja fechar?"}
                        trueBtn={"Sim"}
                        falseBtn={"Não"}
                        setAnswer={handleAnswer}
                        setTrigger={setConfirmationClose}
                    />
                ) : ""} 
                    
                <form className='taskForm-createTask' onSubmit={handleCreateTask}>

                    <div className="CreateTaskForm-fields">

                        <textarea 
                            name="taskName" 
                            className='taskName-textarea'
                            rows="1"
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder='Nome da tarefa'
                            value={taskName}
                        />
                        
                        <textarea 
                            name="description" 
                            id="description-textarea" 
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            cols="10" 
                            rows="10" 
                            placeholder='Descrição'
                        ></textarea>
                        
                        <select 
                            required
                            name="priorityDropdown" 
                            id="priorityDropdown"
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                            style={{border: priorityColor}}
                        >
                            <option value="">Selecione a prioridade</option>
                            <option value="1">Prioridade 1</option>
                            <option value="2">Prioridade 2</option>
                            <option value="3">Prioridade 3</option>
                            <option value="4">Prioridade 4</option>
                        </select>
                        
                        <select 
                            required
                            name="statusDropdown" 
                            id="statusDropdown"
                            value={taskStatus}
                            onChange={(e) => setTaskStatus(e.target.value)}
                        >
                            <option value="">Selecione o status da tarefa   </option>
                            <option value="TO DO">TO DO (A fazer)</option>
                            <option value="DOING">DOING (Fazendo)</option>
                            <option value="DONE">DONE (Feita)</option>
                        </select>
        
                    </div>
                    
                    <button type='submit' title='Criar tarefa'><img src={submitIcon} className='createTask-img' alt="Submit icon" /></button>
                </form>

                
            </div>
        </div>
    );
}

export default ContainerCreateCard;
