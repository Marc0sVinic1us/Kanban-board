
from flask_sqlalchemy import *
from controllers.start_database import db

class NewTask(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    taskname = db.Column(db.String(100), nullable=False)
    taskdescription = db.Column(db.String(2000), nullable=True)
    taskpriority = db.Column(db.Integer, nullable=False)

    # Coluna de chave estrangeira referenciando a tabela de Usuários
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relacionamento entre Tarefa e Usuário
    user = db.relationship('SingUp', back_populates='task')
    
    def __init__(self, taskname, taskdescription, taskpriority, user_id):
        self.taskname = taskname
        self.taskdescription = taskdescription
        self.taskpriority = taskpriority
        self.user_id = user_id  

    def __repr__(self):
        return f"{self.taskName}"
    
    def send_to_db(self):
        db.session.add(self)

        try:
            # Commit para salvar a instância no banco de dados
            db.session.commit()
            print("-> NOVA TAREFA CRIADA")

            return {
                    'status': True,
                    'message': 'Tarefa criada com sucesso!'
                    }

        except:
            # Em caso de erro, faça rollback
            db.session.rollback()
            return {
                    'status': False, 
                    'message': 'Falha na criação da tarefa, favor tentar novamente'
                    }