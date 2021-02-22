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

        # populate user's invites
        user_invites = user.invites
        invites = []
        for invite in user_invites:
            invites.append(invite.to_dict())

        return jsonify(
            profile=safe_user,
            boats=boats,
            vehicles=vehicles,
            invites=invites,
        ), 200

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
