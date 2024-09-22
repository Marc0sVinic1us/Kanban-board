
from flask_sqlalchemy import *
from config.db_config import db

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
    