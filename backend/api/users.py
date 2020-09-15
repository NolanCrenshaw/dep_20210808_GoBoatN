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


@user.route('/token')
@jwt_required
def user_by_token():
    # return user by token
    user_object = get_jwt_identity()
    user = User.query.filter_by(email=user_object['email']).first()
    safe_user = user.to_safe_object()

    # populate user's boats
    user_boats = user.boats
    boats = []
    for boat in user_boats:
        boats.append(boat.to_dict())

    # populate user's vehicles
    user_vehicles = user.vehicles
    vehicles = []
    for vehicle in user_vehicles:
        vehicles.append(vehicle.to_dict())

    return jsonify(
        user=safe_user,
        boats=boats,
        vehicles=vehicles
    ), 200
