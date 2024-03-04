import bcrypt

#CRYPT
def hash_password(password):
    # Gere um salt e use-o para hashear a senha
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

    return hashed_password.decode('utf-8')

