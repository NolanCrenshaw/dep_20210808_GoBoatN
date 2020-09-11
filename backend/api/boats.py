# Package Requirements
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, Boat

boat = Blueprint('boats', __name__)


# Returns list of
@boat.route('/<id>')
@jwt_required
def boats_by_user_id(id):
    pass
