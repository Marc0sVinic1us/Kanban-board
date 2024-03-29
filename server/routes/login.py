from flask import *
from utils.check_password import check_password
from flask_jwt_extended import create_access_token

from controllers.userControllers import getUserByEmail

# login_blueprint = Blueprint("/login")
login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/login', methods=['POST'])
def login():

    user_credentials = request.form["user_credentials"]
    
    (username, password) = user_credentials.split(",")

    user = getUserByEmail(
        useremail=username
    )

    if user and check_password(password, user.user_password):
        
        access_token = create_access_token(identity=username)

        print("-> USUÁRIO LOGADO")
        
        return {
                'status': True, 
                'message': 'Login bem-sucedido',
                'access_token': access_token,
                'username': user.username,
                'userID': user.id
                }
    else:
        return {
                'status': False, 
                'message': 'Credenciais inválidas'
                }
