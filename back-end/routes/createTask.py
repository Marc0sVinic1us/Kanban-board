from flask import *
from flask_jwt_extended import jwt_required

createTask_blueprint = Blueprint('createTask', __name__)

# Rota com bloqueio de requisição sem o devido token
@createTask_blueprint.route('/createTask', methods=['GET'])
@jwt_required()
def createTask():          

    obj =  { 
            'message': 'Tarefa criada com sucesso!'
            }   
    
    print("-> NOVA TAREFA CRIADA")
        
    return jsonify(obj)
