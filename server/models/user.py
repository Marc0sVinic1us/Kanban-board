
from flask_sqlalchemy import *
from utils.start_database import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    useremail = db.Column(db.String(100), nullable=False)
    user_dateOfBirth = db.Column(db.Date, nullable=True)
    user_password = db.Column(db.String(200), nullable=False)

    task = db.relationship('Task', back_populates='user')
    
    def __init__(self, username, useremail, user_dateOfBirth, user_password):
        self.username = username
        self.useremail = useremail
        self.user_dateOfBirth = user_dateOfBirth
        self.user_password = user_password  

    def __repr__(self):
        return f"{self.username}"
