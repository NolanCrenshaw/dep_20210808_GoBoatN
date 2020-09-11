# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, User


# Blueprint Declaration
user = Blueprint('users', __name__)


@user.route('/<id>')
@jwt_required
def user_by_id(id):
    user = User.query.filter_by(id=id).first()
    return jsonify(user=user.to_safe_object())


@user.route('/token', methods=["GET"])
@jwt_required
def user_by_token():
    user_object = get_jwt_identity()
    user = User.query.filter_by(email=user_object['email']).first()
    safe_user = user.to_safe_object()
    return jsonify(safe_user), 200
