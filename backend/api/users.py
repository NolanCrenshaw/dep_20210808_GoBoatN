# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, User, Trip


# Blueprint Declaration
user = Blueprint('users', __name__)


# Get UserSelf by Token
@user.route('/', methods=["GET", "PUT"])
@jwt_required()
def user_by_token():

    # GET path
    if request.method == "GET":
        # return user by token
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        safe_user = user.to_safe_object()
        return jsonify(user=safe_user), 200

    # PUT path
    if request.method == "PUT":
        data = request.get_json()
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        # ~~ TODO ~~ UPDATE LOGIC HERE ~~
        # user.profile_pic = data
        # db.session.commit()
        return jsonify(message="PUT request reached")


# Get User by ID
@user.route('/<id>')
@jwt_required()
def user_by_id(id):
    # return safe_user object by id
    user = User.query.filter_by(id=id).first()
    safe_user = user.to_safe_object()
    return jsonify(user=safe_user), 200
