# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

# Local Requirements
from ..models import db, User, Trip


# Blueprint Declaration
user = Blueprint('users', __name__)


# Get UserSelf by Token
@user.route('/', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def handle_user_by_token():
    user_email = get_jwt_identity()
    user_obj = User.query.filter_by(email=user_email).first()

    # PUT path
    if request.method == "PUT":
        data = request.get_json()
        user_obj.username = data["username"]
        user_obj.firstname = data["firstname"]
        user_obj.lastname = data["lastname"]
        user_obj.zipcode = data["zipcode"]
        user_obj.about = data["about"]
        user_obj.skill = data["skill"]
        user_obj.profile_pic = data["profilePic"]
        user_obj.banner_pic = data["bannerPic"]
        user_obj.sprite = data["sprite"]
        user_obj.updated_at = datetime.utcnow
        return jsonify(message="User Successfully Updated"), 200

    # DELETE path
    if request.method == "DELETE":
        db.session.delete(user_obj)
        db.session.commit()
        return jsonify(message="User Successfully Delete"), 200

    # GET path
    else:
        return jsonify(user=user_obj.to_safe_object()), 200


@user.route('/<id>', methods=["GET", "DELETE"])
@jwt_required()
def handle_user_by_id(id):
    # GET path
    user_obj = User.query.filter_by(id=id).first()
    return jsonify(user=user_obj.to_safe_object()), 200
