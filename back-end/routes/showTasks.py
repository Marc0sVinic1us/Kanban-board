from flask import *
from flask_jwt_extended import jwt_required

from models.user import SingUp

showTasks_blueprint = Blueprint('showTasks', __name__)

# Rota com bloqueio de requisição sem o devido token
@showTasks_blueprint.route('/showTasks', methods=['POST', 'GET'])
@jwt_required()
def showTasks():          
    
    userID = request.form["userID"]

    user = SingUp.query.get(userID)

    tasks = []
    index = 0
    for task in user.task:
        tasks.append(
            {
                "key": index,
                "taskname": task.taskname,
                "taskdescription": task.taskdescription
            }
        )
        index += 1

    return tasks

