# Package Requirements
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, Vehicle

vehicle = Blueprint('vehicles', __name__)
