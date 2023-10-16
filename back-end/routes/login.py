from flask import *
from models.user import SingUp
from controllers.hash_password import hash_password
from controllers.check_password import check_password
from flask_jwt_extended import create_access_token

# login_blueprint = Blueprint("/login")
login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/login', methods=['POST'])
def login():

    user_credentials = request.form["user_credentials"]
    
    username = user_credentials.split(",")[0]
    password = user_credentials.split(",")[1]

    user = SingUp.query.filter_by(useremail=username).first()

    if user and check_password(password, user.user_password):
        
        access_token = create_access_token(identity=username)

        print("-> ACCESS TOKEN: ", access_token)
        
        return {
                'status': True, 
                'message': 'Login bem-sucedido'
                }
    else:
        return {
                'status': False, 
                'message': 'Credenciais inválidas'
                }
