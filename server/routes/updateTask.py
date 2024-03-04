from flask import *
from flask_jwt_extended import jwt_required

from controllers.taskControllers import updateTask

updateTask_blueprint = Blueprint('updateTask', __name__)
    
@updateTask_blueprint.route('/updateTask', methods=['POST'])
@jwt_required()
def updateTaskRoute():          

    (taskName, taskDescription, taskPriority, taskID, taskStatus) = request.form["userTask"].split(",")

    status = updateTask(
        task_id=taskID, 
        taskname=taskName, 
        task_description=taskDescription, 
        task_priority=taskPriority, 
        taskstatus=taskStatus
    )

    return status
