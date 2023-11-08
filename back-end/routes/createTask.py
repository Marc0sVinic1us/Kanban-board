from flask import *
from flask_jwt_extended import jwt_required
from models.task import NewTask

createTask_blueprint = Blueprint('createTask', __name__)
    
@createTask_blueprint.route('/createTask', methods=['POST'])
@jwt_required()
def createTask():          
    
    userTask = request.form["userTask"]

    (taskName, taskDescription, taskPriority, userID) = userTask.split(",")

    new_task = NewTask(
                        user_id=userID, 
                        taskname=taskName, 
                        taskdescription=taskDescription, 
                        taskpriority=taskPriority
                )
        
    status = new_task.send_to_db()
    
    return status

