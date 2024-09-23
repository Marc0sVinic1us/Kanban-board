from flask import *
from flask_jwt_extended import jwt_required

from controllers.taskControllers import deleteTask

deleteTask_blueprint = Blueprint('deleteTask', __name__)
    
@deleteTask_blueprint.route('/deleteTask/<int:task_id>', methods=['DELETE'])
@jwt_required()
def deleteTaskRoute(task_id):          

    task = deleteTask(
        task_id=task_id
    )

    if task:
        return jsonify({
                'status': True,
                'message': 'Tarefa excluida com sucesso!'
            })
    
    abort(404)
