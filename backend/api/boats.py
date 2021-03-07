from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..models import db, User, Boat

boat = Blueprint('boats', __name__)


@boat.route('/', methods=["GET", "POST"])
@jwt_required()
def handle_boats():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    # POST path
    if request.method == "POST":
        data = request.get_json()
        boat = Boat(
            name=data['name'],
            user_id=user.id,
            occupancy=data['occupancy'],
            sprite=data['sprite']
        )
        db.session.add(boat)
        db.session.commit()
        return jsonify(message="boat created successfully"), 200

    # GET path
    else:
        boats = []
        user_boats = user.boats
        for boat in user_boats:
            boats.append(boat.to_dict())
        return jsonify(boats=boats), 200


@boat.route('/<id>', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def handle_boat_by_id(id):
    boat_obj = Boat.query.filter_by(id=id).first()

    # PUT path
    if request.method == "PUT":
        data = request.get_json()
        boat_obj.name = data["name"]
        boat_obj.occupancy = data["occupancy"]
        boat_obj.sprite = data["sprite"]
        db.session.commit()
        return jsonify(message="Boat Successfully Updated"), 200

    # DELETE path
    if request.method == "DELETE":
        user_email = get_jwt_identity()
        user_obj = User.query.filter_by(email=user_email).first()
        if boat_obj.user_id == user_obj.id:
            db.session.delete(boat_obj)
            db.session.commit()
            return jsonify(message="Boat Successfully Removed"), 200
        else:
            return jsonify(message="Unauthorized Request"), 403

    # GET path
    else:
        return jsonify(boat=boat_obj.to_dict()), 200
