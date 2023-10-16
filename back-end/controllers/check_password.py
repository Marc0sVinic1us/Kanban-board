
import bcrypt

# DECRYPT
# Verificar a senha fornecida pelo usuário e a senha criptorafada no banco de dados
def check_password(password, hashed_password):
    
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
    