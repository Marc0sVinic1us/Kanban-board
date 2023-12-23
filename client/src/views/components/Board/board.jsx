import { React, useState } from 'react'

import { Droppable } from "react-beautiful-dnd"; 

import "./board_style.css"

import TaskCard from "../TaksCard/taskcard";
import { useEffect } from 'react';

function Board(props) {

    const [ boardTaskCards, setBoardsTaskCards ] = useState([]);

    useEffect(() => {
        const filteredTasks = props.taskCards.filter((task) => task.taskstatus === props.boardName);
        setBoardsTaskCards(filteredTasks);
    }, [props.boardName, props.taskCards]);

    return (
        <aside>
            <h3>{props.boardName}</h3>
            <section>
                <Droppable droppableId={props.boardName}>
                    {(provided) => (
                        <article
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            { boardTaskCards !== null && boardTaskCards !== undefined && Array.isArray(boardTaskCards) ? (
                            
                                boardTaskCards.map((task, index) => (                            
                                    <TaskCard 
                                        key={index}
                                        index={index}
                                        taskKey={task.key}
                                        taskName={task.taskname}
                                        taskDescription={task.taskdescription}
                                        taskPriority={task.taskpriority}
                                        taskStatus={task.taskstatus}
                                        setTriggerViewTask={props.setPopupTask}
                                        setTaskDataView={props.setTaskDataView}
                                    />    
                                ))) : ""
                            }

                            {provided.placeholder}
                            </article>
                        )
                    }
                </Droppable>
            </section>
        </aside>

    )
}

export default Board;
