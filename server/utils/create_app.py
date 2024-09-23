
import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import *
from dotenv import load_dotenv
from config.db_config import DatabaseConfig

from config.db_config import db

# Importando rotas
from routes.userRoutes.login import login_blueprint
from routes.userRoutes.signUp import signUp_blueprint
from routes.taskRoutes.createTask import createTask_blueprint
from routes.taskRoutes.showTasks import showTasks_blueprint
from routes.taskRoutes.updateTask import updateTask_blueprint
from routes.taskRoutes.deleteTask import deleteTask_blueprint

def create_app():

    app = Flask(__name__)
    CORS(app)   

    load_dotenv()

    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    app.config['JWT_SECRET'] = os.getenv("JWT_SECRET")
    app.config.from_object(DatabaseConfig)
    
    # Inicializa o banco de dados
    db.init_app(app)
    
    JWTManager(app)


    app.register_blueprint(login_blueprint)
    app.register_blueprint(signUp_blueprint)
    app.register_blueprint(createTask_blueprint)
    app.register_blueprint(showTasks_blueprint)
    app.register_blueprint(updateTask_blueprint)
    app.register_blueprint(deleteTask_blueprint)


    return app