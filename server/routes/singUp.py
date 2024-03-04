from flask import Blueprint, request
from utils.hash_password import hash_password

from controllers.userControllers import getUserByEmail, createUser

singUp_blueprint = Blueprint("singUp", __name__)

@singUp_blueprint.route("/singUp", methods=['POST'])
def singUp():
    
    user_singUp = request.form["user_singUp"]

    (name, email, dateBirth, password) = user_singUp.split(",")

    # Criptografar a senha
    hashed_password = hash_password(password)

    existing_user = getUserByEmail(
        useremail=email
    )

    if existing_user:

        print("-> EMAIL JÁ CADASTRADO")
        return {
                'status': False, 
                'message': 'E-mail já cadastrado'
                }
    
    else:
        
        status = createUser(
            useremail=email,
            user_dateOfBirth=dateBirth,
            user_password=hashed_password,
            username=name
        )

        return status