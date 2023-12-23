from flask import *
from flask_jwt_extended import jwt_required

from models.user import SingUp

showTasks_blueprint = Blueprint('showTasks', __name__)

@showTasks_blueprint.route('/showTasks', methods=['POST', 'GET'])
@jwt_required()
def showTasks():          
    
    userID = request.form["userID"]

    user = SingUp.query.get(userID)

    tasks = []
    for task in user.task:

        tasks.append(
            {
                "key": task.id,
                "taskname": task.taskname,
                "taskdescription": task.taskdescription,
                "taskpriority": task.taskpriority,
                "taskstatus": task.taskstatus
            }
        )

    return tasks

