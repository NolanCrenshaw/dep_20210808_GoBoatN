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
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        boats = []
        user_boats = user.boats
        for boat in user_boats:
            boats.append(boat.to_dict())
        return jsonify(boats=boats), 200

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


@boat.route('/<id>', methods=["GET", "PUT"])
@jwt_required()
def handle_boat_by_id(id):
    boat_object = Boat.query.filter_by(id=id).first()

    # GET path
    if request.method == "GET":
        return jsonify(boat=boat_object.to_dict()), 200

    # PUT path
    if request.method == "PUT":
        return jsonify(message="reached boat PUT successfully"), 200


# Deletes Boat instance
@boat.route('/delete', methods=["DELETE"])
@jwt_required()
def destroy_boat():
    data = request.get_json()
    boat = Boat.query.filter_by(id=data["id"]).first()
    db.session.delete(boat)
    db.session.commit()
    return jsonify(message="boat deleted"), 200
