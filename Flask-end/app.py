from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__)
app.secret_key = 'sekrit_key'
CORS(app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
migrate = Migrate(app, db) 

# Create login manager before app context

login_manager = LoginManager()
login_manager.init_app(app)
    
with app.app_context():
    from models import User
    import routes

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    @login_manager.unauthorized_handler
    def unauthorized_callback():
        return "Bawal" 
 
    
if __name__ == "__main__":
    app.run(debug=True)