from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity


from ..models import db, User, Friend


friend = Blueprint('friends', __name__)


# Get Friends by Token
@friend.route('/', methods=["GET"])
@jwt_required()
def get_friends_by_token():
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
