# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, Boat

boat = Blueprint('boats', __name__)


@boat.route('/', methods=["GET", "POST"])
@jwt_required()
def handle_boats():

    # GET path
    if request.method == "GET":
        return jsonify(message="boats GET reached"), 200

    # POST path
    if request.method == "POST":
        data = request.get_json()
        boat = Boat(
            name=data['name'],
            make=data['make'],
            user_id=data['user_id'],
            occupancy=data['occupancy'],
            sprite=data['sprite']
        )
        db.session.add(boat)
        db.session.commit()
        return jsonify(message="boat created successfully"), 200


# Deletes Boat instance
@boat.route('/delete', methods=["DELETE"])
@jwt_required()
def destroy_boat():
    data = request.get_json()
    boat = Boat.query.filter_by(id=data["id"]).first()
    db.session.delete(boat)
    db.session.commit()
    return jsonify(message="boat deleted"), 200
