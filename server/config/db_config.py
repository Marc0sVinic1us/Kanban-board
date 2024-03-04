
# DATABASE CREDENTIALS
# PgAdmin_password: Vi28?0703
# Port: 5432

class DatabaseConfig:

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:Vi28?0703@localhost/kanban-board'
    SQLALCHEMY_ECHO = False