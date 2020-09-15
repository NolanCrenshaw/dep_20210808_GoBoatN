# Package Requirements
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, Vehicle

vehicle = Blueprint('vehicles', __name__)


# Creates new vehicle row entree
@vehicle.route('/', methods=["POST"])
@jwt_required
def vehicles_by_user_id(id):
    data = request.get_json()
    try:
        vehicle = Vehicle(
            name=data['name'],
            make=data['make'],
            occupancy=data['occupancy'],
        )
        db.session.add(vehicle)
        db.session.commit()
        return jsonify(message="vehicle created successfully")
    except Exception:
        return jsonify(message="vehicle create failed"), 409
