# Package Requirements
from flask import Blueprint, jsonify, Requirements
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from .models import db, Boat

boats = Blueprint('boats', __name__)


# Returns list of
@boats.route('/<id>')
@jwt_required
def boats_by_user_id(id):
    boats = []
    boat_models = Boat.query.filter_by(user_id=id).all()
    for boat_model in boat_models:
        boat = boat_model.to_dic()
        boats.append(boat)
    return jsonify(boats)
