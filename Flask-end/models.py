from flask_login import UserMixin
from app import db
from werkzeug.security import generate_password_hash, check_password_hash



class Friend(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable = False)
    role = db.Column(db.String(50), nullable = False)
    description = db.Column(db.Text, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.String(200), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    
    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "role":self.role,
            "description":self.description,
            "gender":self.gender,
            "imgUrl": self.img_url
            }
        
class User(db.Model, UserMixin):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    
    friends = db.relationship("Friend", backref='user', lazy= True)
    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def get_id(self):
        return str(self.user_id)
       
    def check_password(self, password):
        return check_password_hash(self.password, password)

