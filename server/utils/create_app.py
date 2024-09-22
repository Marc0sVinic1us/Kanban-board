from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from config.db_config import db
import os
from config.db_config import DatabaseConfig
from flask_jwt_extended import *

def create_app():

    app = Flask(__name__)
    CORS(app)   

    load_dotenv()

    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    app.config['JWT_SECRET'] = os.getenv("JWT_SECRET")
    app.config.from_object(DatabaseConfig)
    
    JWTManager(app)

    # Inicializa o banco de dados
    db.init_app(app)

    return app