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


# CORS Preflight Header Handling
def cors_preflight_res():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response


# CORS JSON Response Header Handling
def corsify_res(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


# Routes
@auth.route('/login', methods=['POST', "OPTIONS"])
def login():
    data = request.get_json()

    # CORS Preflight Handling
    if request.method == "OPTIONS":
        return cors_preflight_res()

    elif request.method == "POST":
        try:
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
            else:
                auth_token = create_access_token(
                    identity={"email": user.email}
                )
            return jsonify(auth_token=auth_token), 200

        except Exception:
            return jsonify(message='Login Failed'), 400
    else:
        return jsonify(message="Request Method not recognized"), 400


@ auth.route('/signup', methods=["POST", "OPTIONS"])
def signup():
    print("inside signup")
    data = request.get_json()

    # CORS Preflight Handling
    if request.method == "OPTIONS":
        return cors_preflight_res()

    elif request.method == "POST":
        try:
            username = data['username']
            email = data['email']
            firstname = data['firstname']
            lastname = data['lastname']
            zipcode = int(data['zipcode'])

            if not username:
                return jsonify(message="Username Required"), 400
            elif not email:
                return jsonify(message='Email Required'), 400
            elif not firstname:
                return jsonify(message='First Name Required'), 400
            elif not lastname:
                return jsonify(message='Last Name Required'), 400
            elif not zipcode:
                return jsonify(message='Zipcode Required'), 400

            try:
                hashed_password = set_password(data['password'])
            except Exception:
                return jsonify(message='Password Required'), 400

            user = User(
                username=username,
                email=email,
                hashed_password=hashed_password,
                firstname=firstname,
                lastname=lastname,
                zipcode=zipcode,
            )
            db.session.add(user)
            db.session.commit()

            auth_token = create_access_token(
                identity={"email": data['email']})
            return jsonify(auth_token=auth_token), 200
            print("Clean exit from signup route")
            return jsonify(message="Signup route returning")

        except Exception:
            return jsonify(message="try failed"), 409
    else:
        return jsonify(message="Request Method not recognized"), 400


@ auth.route("/", methods=["GET"])
@ jwt_required
def check_token():
    try:
        auth_token = get_jwt_identity()
        admin = Admin.query.filter_by(username=auth_token['username']).first()
        safe_admin = admin.to_safe_object()
        return jsonify(admin=safe_admin), 200
    except Exception:
        return jsonify(message="Token Check Failed"), 403
