from flask import *
from flask_jwt_extended import jwt_required

from controllers.taskControllers import deleteTask

deleteTask_blueprint = Blueprint('deleteTask', __name__)
    
@deleteTask_blueprint.route('/deleteTask', methods=['POST'])
@jwt_required()
def deleteTaskRoute():          

    task_id = request.form["userTask"].split(",")

    status = deleteTask(
        task_id=task_id
    )

    return status
    
