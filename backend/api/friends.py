from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity


from ..models import db, User, Friend


friend = Blueprint('friends', __name__)


# Get Friends by Token
@friend.route('/', methods=["GET", "POST"])
@jwt_required()
def handle_friends_by_token():

    # POST path
    if request.method == "POST":
        data = request.get_json()
        friend = Friend(
            user_id=data["userID"],
            friend_id=data["friendID"]
        )
        db.session.add(friend)
        db.session.commit()
        return jsonify(message="Friend Successfully Added"), 200

    # GET path
    else:
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        user_friends = user.friends

        friends_list = []
        for num in user_friends:
            user_id = num.to_int()
            friends_list.append(user_id)

        friend_objects = User.query.filter(User.id.in_(friends_list)).all()

        friends = []
        for obj in friend_objects:
            friend = obj.to_safe_object()
            friends.append(friend)

        return jsonify(friends=friends), 200


@friend.route('/<id>', methods=["GET", "DELETE"])
@jwt_required()
def handle_friend_by_id(id):
    friend_obj = User.query.filter_by(id=id).first()

    # DELETE path
    if request.method == "DELETE":
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        if friend_obj.user_id == user.id:
            db.session.delete(friend_obj)
            db.session.commit()
            return jsonify(message="Friend Successfully Removed"), 200
        else:
            return jsonify(message="Unauthorized DELETE Request"), 403

    # GET path
    else:
        return jsonify(friend=friend_obj.to_safe_object()), 200
