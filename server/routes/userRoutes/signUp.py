from flask import Blueprint, request, abort, jsonify
from utils.hash_password import hash_password

from controllers.userControllers import getUserByEmail, createUser

signUp_blueprint = Blueprint("signUp", __name__)

@signUp_blueprint.route("/signUp", methods=['POST'])
def signUp():

    if not request.form or not 'user_signUp' in request.form:
        abort(400)
    
    user_signUp = request.form["user_signUp"]

    (name, email, dateBirth, password) = user_signUp.split(",")

    # Criptografar a senha
    hashed_password = hash_password(password)

    existing_user = getUserByEmail(
        useremail=email
    )

    if existing_user:

        print("-> EMAIL JÁ CADASTRADO")
        return jsonify({
            'status': False, 
            'message': 'E-mail já cadastrado'
        })
    
    else:
        
        user = createUser(
            useremail=email,
            user_dateOfBirth=dateBirth,
            user_password=hashed_password,
            username=name
        )

        if user:
            return jsonify({
                "status": True,
                "message": "Usuário cadastrado com sucesso"
            })
            
    return jsonify({
        "status": False,
        "message": "Falha no cadastro de usuário"
    })
        
        