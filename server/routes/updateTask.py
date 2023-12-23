from flask import *
from flask_jwt_extended import jwt_required
from models.task import NewTask

updateTask_blueprint = Blueprint('updateTask', __name__)
    
@updateTask_blueprint.route('/updateTask', methods=['POST'])
@jwt_required()
def updateTask():          
    
    userTask = request.form["userTask"]

    (taskName, taskDescription, taskPriority, taskID, taskStatus) = userTask.split(",")

    task = NewTask.query.get(taskID)

    if task:
        
        task.taskname = taskName
        task.taskdescription = taskDescription
        task.taskpriority = taskPriority
        task.taskstatus = taskStatus
            
        status = task.send_to_db('update')
        
        return status
    
    else:
        return {
            'status': False,
            'message': 'Tarefa inexistente'
        }
