from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity


from ..models import db, User, Invite


invite = Blueprint('invites', __name__)


@invite.route('/', methods=["GET", "POST"])
@jwt_required()
def handle_invites():

    if request.method == "POST":
        data = request.get_json()
        invite = Invite(
            trip_id=data["tripID"],
            sender_id=data["senderID"],
            receiver_id=data["receiverID"],
        )
        db.session.add(invite)
        db.session.commit()
        return jsonify(message="Invite Successfully Sent"), 200

    else:
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        user_invites = user.invites

        invites = []
        for invite in user_invites:
            invites.append(invite.to_dict())

        return jsonify(invites=invites), 200


@invite.route('/<id>', methods=["GET", "DELETE"])
@jwt_required()
def handle_invite_by_id(id):
    invite_obj = Invite.query.filter_by(id=id).first()

    # DELETE path
    if request.method == "DELETE":
        db.session.delete(invite_obj)
        db.session.commit()
        return jsonify(message="invite deleted successfully"), 200

    # GET path
    if request.method == "GET":
        return jsonify(invite=invite_obj.to_dict()), 200
