from flask import request, jsonify, session
from app import app,db
from models import Friend, User
from flask_login import login_user, logout_user, current_user, login_required, login_manager

@app.route("/api/friends", methods=["GET"])
@login_required
def get_friends():
    # Get all the friends from the database
    friends = Friend.query.filter_by(user_id=current_user.user_id).all()
    result = [friend.to_json() for friend in friends]
    
    return  jsonify(result)

#Create a friend
@app.route("/api/friends", methods=["POST"])
@login_required
def create_friend():
    #Add new friend to the database
    try:
        try:
            data = request.json
            name = data.get("name")
            role = data.get("role")
            description = data.get("description")
            gender = data.get("gender")
            user_id = current_user.user_id
            
            required_fields = {"name": name, "role": role, "description": description, "gender": gender}
            
            # Check for missing keys or empty values
            for field, value in required_fields.items():
                if not value:  # This will catch None, empty string, or other falsy values
                    return jsonify({"error": f"Missing or empty required field: {field}"}), 400
            
            
            #fetch avatar image based on gender
            if gender == "male":
                img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
            elif gender == "female":
                img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
            else:
                img_url = None
                
            new_friend = Friend(name=name, role=role, description=description, gender=gender, img_url=img_url, user_id=current_user.user_id)
            
            db.session.add(new_friend)
            db.session.commit()
            return jsonify(new_friend.to_json())
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"error":str(e)}),500
    except Exception as e:
        return jsonify({"error":str(e)}),500
            
@app.route('/api/delete_friend/<int:id>', methods=["DELETE"])
@login_required
def delete_friend(id):
    
    try:
        friend = Friend.query.get(id)
        #If id exist in the database, delete it
        if not friend or friend.user_id != current_user.user_id:
            return jsonify({"error":"Friend not found or not authorized"}),404
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg":"Friend deleted successfully"}),200
    except Exception as e:
        #If not return an error message
        db.session.rollback()
        return jsonify({"error": e})
    
@app.route('/api/update_friend/<int:id>', methods=["PATCH"])
@login_required
def update_friend(id):
    data = request.json
    friend = Friend.query.get(id)
    #Check if id exist in the database
    #If not return error message
    if not friend:
        return jsonify({"Error":"Wala na siya"}),400
    
    #If yes update the information about that friend
    friend.name = data.get("name",friend.name)
    friend.role = data.get("role",friend.role)
    friend.description = data.get("description",friend.description)
    friend.gender = data.get("gender",friend.gender)
    
    #Commit changes to the database
    try:
        db.session.add(friend)
        db.session.commit()
        return jsonify(friend.to_json()),201
    #Error message if something happens
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": e}),500
    
    
@app.route('/registeruser', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    
    required_fields = {"username": username, "password": password, "email": email}
    
    for key, value in required_fields.items():
        if not value:
            return jsonify({"error": f"Missing or empty required field: {key}"}), 400
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400
    try:
        user = User(username=username, email=email)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    try:
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.user_id
        
        return jsonify({"msg": "Registered successfully"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 401
    
    
@app.route('/login', methods=['POST', 'GET'])
def login():
    try:
        if request.method == 'GET':
        # Handle the redirect from @login_required
            return jsonify({"error": "Authentication required"}), 401
        try:
            data =request.get_json()
            email = data.get('email')
            password = data.get('password')
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
        required_fields = {"email": email, "password": password,}
        
        for key, value in required_fields.items():
            if not value:
                return jsonify({"error": f"Missing or empty required field: {key}"}), 400
        
        user = User.query.filter_by(email=email).first()
        
        if not user or not user.check_password(password):
            return jsonify({"error": "Invalid credentials"}), 401
        
        try:
            login_user(user)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.user_id,  # or other user attributes you want to send
                "username": user.username,  # Assuming User has a username attribute
                "email": user.email
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/logout', methods=['POST'])
def logout():
    try:
        logout_user()
        session.clear()
        return jsonify({"Message": "Logout successfully"}) 
    except Exception as e:
        return jsonify({"error": str(e)}),400
@app.route('/api/current_user', methods=['GET'])
@login_required
def get_current_user():
    return jsonify({
        "user_id": current_user.user_id,  # or another unique identifier
        "username": current_user.username
    })
