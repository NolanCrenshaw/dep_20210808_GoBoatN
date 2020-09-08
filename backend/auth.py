from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
import bcrypt


auth = Blueprint('auth', __name__)
