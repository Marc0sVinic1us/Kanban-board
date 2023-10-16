from flask import Blueprint, request
from controllers.hash_password import hash_password

# Cadastro no banco de dados
from models.user import SingUp

singUp_blueprint = Blueprint("singUp", __name__)

@singUp_blueprint.route("/singUp", methods=['POST'])
def singUp():
    
    user_singUp = request.form["user_singUp"]

    name = user_singUp.split(",")[0]
    email = user_singUp.split(",")[1]
    dateBirth = user_singUp.split(",")[2]
    password = user_singUp.split(",")[3]

    # Criptografar a senha
    hashed_password = hash_password(password)

    existing_user = SingUp.query.filter_by(useremail=email).first()
    if existing_user:

        print("-> EMAIL JÁ CADASTRADO")
        return {
                'status': False, 
                'message': 'E-mail já cadastrado'
                }
    
    else:
        new_user = SingUp(
                            username=name, 
                            useremail=email, 
                            user_dateOfBirth=dateBirth, 
                            user_password=hashed_password
                        )
        
        status = new_user.send_to_db()
        return status
