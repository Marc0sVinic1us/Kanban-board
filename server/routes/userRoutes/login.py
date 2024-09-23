from flask import *
from utils.check_password import check_password
from flask_jwt_extended import create_access_token

from controllers.userControllers import getUserByEmail

login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/login', methods=['POST'])
def login():

    if not request.form or not 'user_credentials' in request.form:
        abort(400)

    user_credentials = request.form["user_credentials"]
    
    (username, password) = user_credentials.split(",")

    user = getUserByEmail(
        useremail=username
    )

    if user and check_password(password, user.user_password):
        
        access_token = create_access_token(identity=username)

        print("-> USUÁRIO LOGADO")
        
        return jsonify({
            'status': True, 
            'message': 'Login bem-sucedido',
            'access_token': access_token,
            'username': user.username,
            'userID': user.id
        })
    
    else:
        return jsonify({
            'status': False, 
            'message': 'Credenciais inválidas'
        })
