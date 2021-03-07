from flask import Blueprint, jsonify, request,  make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

from ..models import db, Trip, Access, River, User


trip = Blueprint('trips', __name__)


@trip.route('/', methods=["GET", "POST"])
@jwt_required()
def trips():
    user_email = get_jwt_identity()
    user_obj = User.query.filter_by(email=user_email).first()

    # POST path
    if request.method == "POST":
        data = request.get_json()
        trip = Trip(
            scheduled_time=data['dateTime'],
            river_id=data['riverID'],
            trip_leader=user_obj.id,
            put_in=data['putinID'],
            take_out=data['takeoutID']
        )
        db.session.add(trip)
        db.session.commit()
        return jsonify(message="Success"), 200

    # GET path
    else:
        user_trips = []
        user_boater_instances = user_obj.boaters
        for instance in user_boater_instances:
            user_trips.append(instance.trip_id)
        trips = []
        trip_objects = Trip.query.filter(Trip.id.in_(user_trips)).all()
        for trip in trip_objects:
            trips.append(trip.to_dict())
        return jsonify(trips=trips), 200


@trip.route('/<id>', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def trip_by_id(id):
    trip_object = Trip.query.filter_by(id=id).first()

    # PUT path
    if request.method == "PUT":
        data = request.get_json()
        trip_object.scheduled_time = data['dateTime']
        trip_object.river_id = data['riverID']
        trip_object.trip_leader = data['userID']
        trip_object.put_in = data['putinID']
        trip_object.take_out = data['takeoutID']
        db.session.commit()
        return jsonify(message="Trip Successfully Updated"), 200

    # DELETE path
    if request.method == "DELETE":
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        if trip_object.trip_leader == user.id:
            db.session.delete(trip_object)
            db.session.commit()
            return jsonify(message="Trip Successfully Deleted"), 200

    else:
        # return trip
        invites = []
        boaters = []
        boats = []
        vehicles = []
        access = []

        # package invite list
        invite_objects = trip_object.invites
        for invite in invite_objects:
            invites.append(invite.to_dict())

        # package boater list
        boater_objects = trip_object.boaters
        for boater in boater_objects:
            boaters.append(boater.to_dict())

        # package access points
        putin = Access.query.filter_by(id=trip_object['put_in']).first()
        takeout = Access.query.filter_by(id=trip_object['take_out']).first()
        access.append(putin.to_dict())
        access.append(takeout.to_dict())

        river = River.query.filter_by(id=trip_object['river_id']).first()
        trip_leader = User.query.filter_by(
            id=trip_object['trip_leader']).first()

        return jsonify(
            trip=trip_object.to_dict(),
            invites=invites,
            boaters=boaters,
            boats=boats,
            vehicles=vehicles,
            access=access,
            river=river.to_dict(),
            trip_leader=trip_leader.to_safe_object(),
        ), 200
