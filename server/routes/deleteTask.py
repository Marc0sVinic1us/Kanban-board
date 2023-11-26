from flask import *
from flask_jwt_extended import jwt_required
from models.task import NewTask

deleteTask_blueprint = Blueprint('deleteTask', __name__)
    
@deleteTask_blueprint.route('/deleteTask', methods=['POST'])
@jwt_required()
def deleteTask():          
    
    userTask = request.form["userTask"]

    taskID = userTask.split(",")

    task = NewTask.query.get(taskID)

    if task:
        status = task.send_to_db('delete')

        return status
    
    else:
        return {
            'status': False,
            'message': 'Tarefa inexistente'
        }
    
