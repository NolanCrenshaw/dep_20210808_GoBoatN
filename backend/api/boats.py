# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, Boat

boat = Blueprint('boats', __name__)


# Creates new boat row entree
@boat.route('/', methods=["POST"])
@jwt_required
def create_boat():
    data = request.get_json()
    try:
        boat = Boat(
            name=data['name'],
            make=data['make'],
            user_id=data['user_id'],
            occupancy=data['occupancy'],
            sprite=data['sprite']
        )
        db.session.add(boat)
        db.session.commit()
        return jsonify(message="boat created successfully")
    except Exception:
        return jsonify(message="boat create failed"), 409


# Deletes a Boat row entree
@boat.route('/<id>/delete', methods=["DELETE"])
@jwt_required
def destroy_boat(id):
    try:
        boat = Boat.query.filter_by(id=id).first()
        db.session.delete(boat)
        db.session.commit()
        return jsonify(message="boat deleted"), 200
    except Exception:
        return jsonify(message="destroy boat route failed"), 400
