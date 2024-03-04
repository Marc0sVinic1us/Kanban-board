from flask import *
from flask_jwt_extended import jwt_required

from controllers.taskControllers import createTask

createTask_blueprint = Blueprint('createTask', __name__)
    
@createTask_blueprint.route('/createTask', methods=['POST'])
@jwt_required()
def createTaskRoute():          
    
    (taskName, taskDescription, taskPriority, userID, taskstatus) = request.form["userTask"].split(",")

    status = createTask(
        user_id=userID,
        taskname=taskName,
        task_priority=taskPriority,
        task_description=taskDescription,
        taskstatus=taskstatus
    )
    
    return status

