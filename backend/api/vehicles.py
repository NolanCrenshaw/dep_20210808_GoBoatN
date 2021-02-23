from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..models import db, User, Vehicle

vehicle = Blueprint('vehicles', __name__)


@vehicle.route('/', methods=["GET", "POST"])
@jwt_required()
def handle_vehicles():

    # GET path
    if request.method == "GET":
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        vehicles = []
        user_vehicles = user.vehicles
        for vehicle in user_vehicles:
            vehicles.append(vehicle.to_dict())
        return jsonify(vehicles=vehicles), 200

    # POST path
    if request.method == "POST":
        data = request.get_json()
        vehicle = Vehicle(
            name=data['name'],
            make=data['make'],
            user_id=data['user_id'],
            occupancy=data['occupancy'],
            sprite=data['sprite']
        )
        db.session.add(vehicle)
        db.session.commit()
        return jsonify(message="vehicle created successfully"), 200


@vehicle.route('/<id>', methods=["GET", "PUT"])
@jwt_required()
def handle_vehicle_by_id(id):
    vehicle_object = Vehicle.query.filter_by(id=id).first()

    # GET path
    if request.method == "GET":
        return jsonify(vehicle=vehicle_object.to_dict()), 200

    # PUT path
    if request.method == "PUT":
        # ~~ TODO ~~
        return jsonify(message="reached vehicle PUT successfully"), 200


@vehicle.route('/delete', methods=["DELETE"])
@jwt_required()
def destroy_vehicle():
    data = request.get_json()
    vehicle = Vehicle.query.filter_by(id=data["id"]).first()
    db.session.delete(vehicle)
    db.session.commit()
    return jsonify(message="vehicle deleted"), 200
