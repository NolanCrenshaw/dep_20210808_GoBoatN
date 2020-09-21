# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, User, Trip


# Blueprint Declaration
user = Blueprint('users', __name__)


# Get User by ID
@user.route('/<id>')
@jwt_required
def user_by_id(id):
    user = User.query.filter_by(id=id).first()
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

    # populate user's trips
    user_trips = user.boaters
    trips = []
    own_trips = []
    guest_trips = []
    for trip in user_trips:
        t = Trip.query.filter_by(id=trip.trip_id).first()
        guest_trips.append(t.to_dict())
    user_own_trips = Trip.query.filter_by(trip_leader=id).all()
    for own_trip in user_own_trips:
        own_trips.append(own_trip.to_dict())
    trips.append(own_trips)
    trips.append(guest_trips)

    return jsonify(
        user=safe_user,
        boats=boats,
        vehicles=vehicles,
        invites=invites,
        trips=trips,
    ), 200


# Get User by Token
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

    # populate user's invites
    user_invites = user.invites
    invites = []
    for invite in user_invites:
        invites.append(invite.to_dict())

    # populate user's trips
    user_trips = user.boaters
    trips = []
    own_trips = []
    guest_trips = []
    for trip in user_trips:
        t = Trip.query.filter_by(id=trip.trip_id).first()
        guest_trips.append(t.to_dict())
    user_own_trips = Trip.query.filter_by(trip_leader=user.id).all()
    for own_trip in user_own_trips:
        own_trips.append(own_trip.to_dict())
    trips.append(own_trips)
    trips.append(guest_trips)

    return jsonify(
        user=safe_user,
        boats=boats,
        vehicles=vehicles,
        invites=invites,
        trips=trips
    ), 200


# Update User Obj
@user.route('/token/update', methods=["PUT"])
@jwt_required
def update_user_by_token():
    if request.method == "PUT":
        try:
            data = request.get_json()
            user_object = get_jwt_identity()
            user = User.query.filter_by(email=user_object['email']).first()
            print("still working")
            print(f' User == {user}')
            print(f' Data == {data}')
            user.profile_pic = data
            print("still working 2")
            db.session.commit()
            return jsonify(message="Update user success"), 200
        except Exception:
            return jsonify(message="Update user failed"), 401
    else:
        return jsonify(message="Request method not cleared"), 402
