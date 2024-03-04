
from flask_sqlalchemy import *
from utils.start_database import db

class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    taskname = db.Column(db.String(100), nullable=False)
    taskdescription = db.Column(db.String(2000), nullable=True)
    taskpriority = db.Column(db.Integer, nullable=False)
    taskstatus = db.Column(db.String(20), nullable=True)

    # Coluna de chave estrangeira referenciando a tabela de Usuários
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relacionamento entre Tarefa e Usuário
    user = db.relationship('User', back_populates='task')
    
    def __init__(self, taskname, taskdescription, taskpriority, user_id, taskstatus):
        self.taskname = taskname
        self.taskdescription = taskdescription
        self.taskpriority = taskpriority
        self.user_id = user_id  
        self.taskstatus = taskstatus

    def __repr__(self):
        return f"{self.taskname}"
    
    def send_to_db(self, flag):
        db.session.add(self)

        if flag == 'update':
            
            try:
                # Commit para salvar as alterações no banco de dados
                db.session.commit()
                print("-> TAREFA ATUALIZADA")

                return {
                        'status': True,
                        'message': 'Tarefa atualizada com sucesso!'
                        }

            except:
                # Em caso de erro, faça rollback
                db.session.rollback()
                return {
                        'status': False, 
                        'message': 'Falha na atualização da tarefa, favor tentar novamente'
                        }
        
        elif flag == 'create':

            try:
                # Commit para salvar as alterações no banco de dados
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
            
        elif flag == 'delete':
        
            try:
                db.session.delete(self)
                
                # Commit para salvar as alterações no banco de dados
                db.session.commit()
                
                print("-> TAREFA EXCLUIDA")

                return {
                        'status': True,
                        'message': 'Tarefa excluida com sucesso!'
                        }

            except:
                # Em caso de erro, faça rollback
                db.session.rollback()
                return {
                        'status': False, 
                        'message': 'Falha na exclusão da tarefa, favor tentar novamente'
                        }
