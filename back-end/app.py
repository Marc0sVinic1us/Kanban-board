from flask import Flask
from flask_cors import CORS
from controllers.start_database import db 
from config import ApplicationConfig
from flask_jwt_extended import *

# Importando rotas
from routes.login import login_blueprint
from routes.singUp import singUp_blueprint

app = Flask(__name__)
CORS(app)

app.config.from_object(ApplicationConfig)
jwt = JWTManager(app)

# Inicializa o banco de dados
db.init_app(app)

# Renderizando rotas
app.register_blueprint(login_blueprint)
app.register_blueprint(singUp_blueprint)

# Inicializa o Flask
if __name__ == '__main__':
    app.run(debug=True)
