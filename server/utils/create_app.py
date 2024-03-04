from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from utils.start_database import db 
from config.db_config import DatabaseConfig
from flask_jwt_extended import *

def create_app():

    app = Flask(__name__)
    CORS(app)   

    load_dotenv()

    app.config.from_object(DatabaseConfig)
    JWTManager(app)

    # Inicializa o banco de dados
    db.init_app(app)

    return app