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


@friend.route('/<id>', methods=["GET", "PUT"])
@jwt_required()
def friend_by_id(id):

    # GET path
    if request.method == "GET":
        user = User.query.filter_by(id=id).first()
        return jsonify(friend=friend.to_safe_object()), 200

    # PUT path
    if request.method == "PUT":
        data = request.get_json()
        return jsonify(message="hit PUT method"), 200


@friend.route('/delete', methods=["DELETE"])
@jwt_required()
def delete_friend():
    data = request.get_json()
    friend = Friend.query.filter_by(id=data["id"]).first()
    db.session.delete(friend)
    db.session.commit()
    return jsonify(message="friend deleted successfully"), 200
