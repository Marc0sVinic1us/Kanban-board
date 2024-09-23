from flask import *
from flask_jwt_extended import jwt_required

from controllers.taskControllers import getTaskskByUserID

showTasks_blueprint = Blueprint('showTasks', __name__)

@showTasks_blueprint.route('/showTasks/<int:user_id>', methods=['GET'])
@jwt_required()
def showTasks(user_id):          

    tasks = getTaskskByUserID(
        user_id=user_id
    )

    if tasks != False:

        arrTasks = []
        for task in tasks:

            arrTasks.append({
                "key": task.id,
                "taskname": task.taskname,
                "taskdescription": task.taskdescription,
                "taskpriority": task.taskpriority,
                "taskstatus": task.taskstatus
            })

        return jsonify({
            "status": True,
            "data": arrTasks
            })
    
    abort(404)

