
# Importando configuração do app
from utils.create_app import create_app

app = create_app()

# Inicializa o Flask
if __name__ == '__main__':
    app.run(debug=True)
