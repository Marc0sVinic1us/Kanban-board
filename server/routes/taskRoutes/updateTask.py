from flask import *
from flask_jwt_extended import jwt_required

from controllers.taskControllers import updateTask

updateTask_blueprint = Blueprint('updateTask', __name__)
    
@updateTask_blueprint.route('/updateTask', methods=['PUT'])
@jwt_required()
def updateTaskRoute():          

    if not request.form or not 'userTask' in request.form:
        abort(400)

    (taskName, taskDescription, taskPriority, taskID, taskStatus) = request.form["userTask"].split(",")

    task = updateTask(
        task_id=taskID, 
        taskname=taskName, 
        task_description=taskDescription, 
        task_priority=taskPriority, 
        taskstatus=taskStatus
    )

    if task:
        return jsonify({
            'status': True,
            'message': 'Tarefa atualizada com sucesso!'
        })

    abort(404)
