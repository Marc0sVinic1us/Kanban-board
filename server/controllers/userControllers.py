
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

        return newUser

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        return False
    
    finally:
        db.session.close()


# READ
def getAllUsers():

    try:
        users = User.query.all()

        return users
    
    except:
        return False
    
    finally:
        db.session.close()


def getUserByEmail(useremail):
    
    try:
        user = User.query.filter_by(useremail=useremail).first()
        return user
    
    except:
        return False
    
    finally:
        db.session.close()


# UPDATE
def updateUser(user_id, username, user_dateOfBirth, user_password, useremail):

    try:
        user = User.query.get(user_id)        
        user.username = username
        user.user_dateOfBirth = user_dateOfBirth
        user.user_password = user_password
        user.usermail = useremail
        
        db.session.add(user)

        # Commit para salvar as alterações no banco de dados
        db.session.commit()
        print("-> USUÁRIO ATUALIZADO")

        return user

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        return False
    
    finally:
        db.session.close()


# DELETE
def deleteUser(user_id):

    try:
        user = User.query.get(user_id)

        db.session.delete(user)
        
        # Commit para salvar as alterações no banco de dados
        db.session.commit()
        
        print("-> USUÁRIO EXCLUIDO")

        return True

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        return False

    finally:
        db.session.close()