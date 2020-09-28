# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, Vehicle

vehicle = Blueprint('vehicles', __name__)


# Creates new vehicle row entree
@vehicle.route('/', methods=["POST"])
@jwt_required
def create_vehicle():
    data = request.get_json()
    try:
        vehicle = Vehicle(
            name=data['name'],
            make=data['make'],
            user_id=data['user_id'],
            occupancy=data['occupancy'],
            sprite=data['sprite']
        )
        db.session.add(vehicle)
        db.session.commit()
        return jsonify(message="vehicle created successfully")
    except Exception:
        return jsonify(message="vehicle create failed"), 409


# Deletes a Vehicle row entree
@vehicle.route('/<id>/delete', methods=["DELETE"])
@jwt_required
def destroy_vehicle(id):
    try:
        vehicle = Vehicle.query.filter_by(id=id).first()
        db.session.delete(vehicle)
        db.session.commit()
        return jsonify(message="vehicle deleted"), 200
    except Exception:
        return jsonify(message="destroy vehicle route failed"), 400
