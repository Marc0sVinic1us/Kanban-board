from flask import *
from models.user import SingUp
from controllers.check_password import check_password
from flask_jwt_extended import create_access_token

# login_blueprint = Blueprint("/login")
login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/login', methods=['POST'])
def login():

    user_credentials = request.form["user_credentials"]
    
    (username, password) = user_credentials.split(",")

    user = SingUp.query.filter_by(useremail=username).first()

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
