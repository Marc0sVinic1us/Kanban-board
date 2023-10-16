
from flask_sqlalchemy import *
from controllers.start_database import db

class SingUp(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    useremail = db.Column(db.String(100), nullable=False)
    user_dateOfBirth = db.Column(db.Date, nullable=True)
    user_password = db.Column(db.String(200), nullable=False)
    
    def __init__(self, username, useremail, user_dateOfBirth, user_password):
        self.username = username
        self.useremail = useremail
        self.user_dateOfBirth = user_dateOfBirth
        self.user_password = user_password  

    def __repr__(self):
        return f"{self.username}"
    
    def send_to_db(self):
        db.session.add(self)

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
        
