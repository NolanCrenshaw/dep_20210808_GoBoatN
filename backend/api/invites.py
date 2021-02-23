from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity


from ..models import db, User, Invite


invite = Blueprint('invites', __name__)


@invite.route('/', methods=["GET", "POST"])
@jwt_required()
def handle_invites():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    user_invites = user.invites

    invites = []
    for invite in user_invites:
        invites.append(invite.to_dict())

    return jsonify(invites=invites), 200


@invite.route('/<id>', methods=["GET", "PUT"])
@jwt_required()
def invite_by_id(id):

    # GET path
    if request.method == "GET":
        invite = Invite.query.filter_by(id=id).first()
        return jsonify(invite=invite.to_dict()), 200

    # PUT path
    if request.method == "PUT":
        data = request.get_json()
        return jsonify(message="hit PUT method"), 200


@invite.route('/delete', methods=["DELETE"])
@jwt_required()
def delete_friend():
    data = request.get_json()
    invite = Invite.query.filter_by(id=data["id"]).first()
    db.session.delete(invite)
    db.session.commit()
    return jsonify(message="invite deleted successfully"), 200
