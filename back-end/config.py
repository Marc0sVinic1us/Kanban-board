
# DATABASE CREDENTIALS
# PgAdmin_password: Vi28?0703
# Port: 5432

class ApplicationConfig:

    SECRET_KEY = "B&I%wd!ibq$asa1aN/Aicbweb?cb0wS12AS4weND2Q"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:Vi28?0703@localhost/kanban-board'
    SQLALCHEMY_ECHO = False
    