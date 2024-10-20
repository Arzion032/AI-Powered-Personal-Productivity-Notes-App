from flask import request, jsonify, session
from app import app,db
from models import Friend

@app.route("/api/friends", methods=["GET"])
def get_friends():
    # Get all the friends from the database
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return  jsonify(result)

#Create a friend
@app.route("/api/friends", methods=["POST"])
def create_friend():
    #Add new friend to the database
    try:
        data = request.json
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")
        
        required_fields = ["name", "role", "description", "gender"]
        
        if not all([field in data for field in required_fields]):
            return jsonify({"error":"Missing required fields"}),400
        
        if not required_fields:
            return jsonify({"error":"Missing required fields"}),400
        
        #fetch avatar image based on gender
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None
            
        new_friend = Friend(name=name, role=role, description=description, gender=gender, img_url=img_url)
        
        db.session.add(new_friend)
        db.session.commit()
        return jsonify({"msg":"Friend created successfully"}),201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":e}),500
        
@app.route('/api/delete_friend/<int:id>', methods=["DELETE"])
def delete_friend(id):
    
    try:
        friend = Friend.query.get(id)
        #If id exist in the database, delete it
        if not friend:
            return jsonify({"error":"Friend not found"}),404
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg":"Friend deleted successfully"}),200
    except Exception as e:
        #If not return an error message
        db.session.rollback()
        return jsonify({"error": e})
    
@app.route('/api/update_friend/<int:id>', methods=["PATCH"])
def update_friend(id):
    data = request.json
    friend = Friend.query.get(id)
    #Check if id exist in the database
    #If not return error message
    if not friend:
        return jsonify({"Error":"Wala na siya"})
    
    #If yes update the information about that friend
    friend.name = data.get("name",friend.name)
    friend.role = data.get("role",friend.role)
    friend.description = data.get("description",friend.description)
    friend.gender = data.get("gender",friend.gender)
    
    #Commit changes to the database
    try:
        db.session.add(friend)
        db.session.commit()
        return jsonify({"Success":"Pare", "friend": friend.to_json()})
    #Error message if something happens
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": e})