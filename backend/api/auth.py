# Package Requirements
from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, create_access_token
from datetime import datetime
import bcrypt

# Local Requirements
from ..models import db, User


# Blueprint Declaration
auth = Blueprint('auth', __name__)


# Password Hashing & Verify Functions
def set_password(password):
    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password


def verify_password(password, hashed_password):
    # Return value could be made more sophisticated
    if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return True
    else:
        return False


# Routes
@auth.route('/login', methods=['POST', "OPTIONS"])
def login():
    data = request.get_json()

    # CORS Preflight Handling
    if request.method == "OPTIONS":
        return jsonify(message="hello options"), 200

    elif request.method == "POST":
        email = data['email']
        password = data['password']
        if not email:
            return jsonify(message="Email Required"), 400
        elif not password:
            return jsonify(message='Password Required'), 400

        # Query
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify(message='Email Not Valid'), 400

        verified = verify_password(password, user.hashed_password)

        if not verified:
            # Error needs handling decision
            return jsonify(message='Incorrect Password'), 403

        email = user.email
        auth_token = create_access_token(identity=email)
        return jsonify(auth_token=auth_token), 200
        # return jsonify(email=email), 200
    else:
        return jsonify(message="Request Method not recognized"), 400


@ auth.route('/signup', methods=["POST", "OPTIONS"])
def signup():
    data = request.get_json()

    if request.method == "OPTIONS":
        return jsonify(message="hello options"), 200

    elif request.method == "POST":
        username = data['username']
        email = data['email']

        if not username:
            return jsonify(message="Username Required"), 400
        elif not email:
            return jsonify(message='Email Required'), 400

        try:
            hashed_password = set_password(data['password'])
        except Exception:
            return jsonify(message='Password Required: '), 400

        user = User(
            username=username,
            email=email,
            hashed_password=hashed_password,
        )
        db.session.add(user)
        db.session.commit()

        # auth_token = create_access_token(
        #     identity={"email": data['email']})
        # return jsonify(auth_token=auth_token), 200
        print("Clean exit from signup route")
        return jsonify(message="Signup route returning")

    else:
        return jsonify(message="Request Method not recognized"), 400


@ auth.route("/", methods=["GET"])
@ jwt_required()
def check_token():
    try:
        auth_token = get_jwt_identity()
        admin = Admin.query.filter_by(email=auth_token).first()
        safe_admin = admin.to_safe_object()
        return jsonify(admin=safe_admin), 200
    except Exception:
        return jsonify(message="Token Check Failed"), 403
