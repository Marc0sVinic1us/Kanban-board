
from config.db_config import db
from models.user import User


# CREATE
def createUser(username, user_dateOfBirth, user_password, useremail):
    
    newUser = User(
        username=username,
        user_dateOfBirth=user_dateOfBirth,
        user_password=user_password,
        useremail=useremail,
    )
    
    db.session.add(newUser)

    try:
        # Commit para salvar a instância no banco de dados
        db.session.commit()
        print("-> NOVO USUÁRIO CADASTRADO")

        return {
                'status': True, 
                'message': 'Cadastro realizado com sucesso!'
                }

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        return {
                'status': False, 
                'message': 'Erro no cadastro de usuário'
                }


# READ
def getAllUsers():

    users = User.query.all()

    arrUsers = []
    for user in users:

        arrUsers.append({
            "username": user.username,
            "user_dateOfBirth": user.dateOfBirth,
            "user_password": user.userpasword,
            "useremail": user.useremail
        })

    return arrUsers


def getUserByEmail(useremail):

    user = User.query.filter_by(useremail=useremail).first()

    return user


# UPDATE
def updateUser(user_id, username, user_dateOfBirth, user_password, useremail):

    user = User.query.get(user_id)

    if user:
        
        user.username = username
        user.user_dateOfBirth = user_dateOfBirth
        user.user_password = user_password
        user.usermail = useremail
    
    db.session.add(user)

    try:
        # Commit para salvar as alterações no banco de dados
        db.session.commit()
        print("-> USUÁRIO ATUALIZADO")

        return {
                'status': True,
                'message': 'Usuário atualizado com sucesso!'
                }

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        return {
                'status': False, 
                'message': 'Falha na atualização do usuário, favor tentar novamente'
                }


# DELETE
def deleteUser(user_id):

    user = User.query.get(user_id)

    db.session.delete(user)

    try:
        
        # Commit para salvar as alterações no banco de dados
        db.session.commit()
        
        print("-> USUÁRIO EXCLUIDO")

        return {
                'status': True,
                'message': 'Usuário excluido com sucesso!'
                }

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        return {
                'status': False, 
                'message': 'Falha na exclusão do usuário, favor tentar novamente'
                }