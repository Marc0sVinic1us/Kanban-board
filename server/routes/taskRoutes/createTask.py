from flask import *
from flask_jwt_extended import jwt_required

from controllers.taskControllers import createTask

createTask_blueprint = Blueprint('createTask', __name__)
    
@createTask_blueprint.route('/createTask', methods=['POST'])
@jwt_required()
def createTaskRoute():          
    
    if not request.form or not 'userTask' in request.form:
        abort(400)
    
    (taskName, taskDescription, taskPriority, userID, taskstatus) = request.form["userTask"].split(",")

    task = createTask(
        user_id=userID,
        taskname=taskName,
        task_priority=taskPriority,
        task_description=taskDescription,
        taskstatus=taskstatus
    )

    if task:
        return jsonify({
            "status": True,
            "message": "Tarefa criada com sucesso!"
            }), 201

    abort(500)
