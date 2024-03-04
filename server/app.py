
# Importando configuração do app
from utils.create_app import create_app

# Importando rotas
from routes.login import login_blueprint
from routes.singUp import singUp_blueprint
from routes.createTask import createTask_blueprint
from routes.showTasks import showTasks_blueprint
from routes.updateTask import updateTask_blueprint
from routes.deleteTask import deleteTask_blueprint

app = create_app()

# Renderizando rotas
app.register_blueprint(login_blueprint)
app.register_blueprint(singUp_blueprint)
app.register_blueprint(createTask_blueprint)
app.register_blueprint(showTasks_blueprint)
app.register_blueprint(updateTask_blueprint)
app.register_blueprint(deleteTask_blueprint)

# Inicializa o Flask
if __name__ == '__main__':
    app.run(debug=True)
