# Package Requirements
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, Boat

boat = Blueprint('boats', __name__)


# Creates new boat row entree
@boat.route('/', methods=["POST"])
@jwt_required
def boats_by_user_id(id):
    data = request.get_json()
    try:
        boat = Boat(
            name=data['name'],
            make=data['make'],
            occupancy=data['occupancy'],
        )
        db.session.add(boat)
        db.session.commit()
        return jsonify(message="boat created successfully")
    except Exception:
        return jsonify(message="boat create failed"), 409
