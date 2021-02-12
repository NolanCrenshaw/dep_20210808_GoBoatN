# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

# Local Requirements
from ..models import db, Trip, Access, River, User


# Blueprint Declaration
trip = Blueprint('trips', __name__)


@trip.route('/')
@jwt_required
def trips_all():
    # return all trips ordered by name
    trip_objects = Trip.query.order_by(trip.name).all()
    trips = []

    # extract relationships
    for trip_obj in trip_objects:
        trip = [trip_obj.to_dict()]
        invites = []
        boaters = []

        # package invite list
        invite_objects = trip_obj.invites
        for invite in invite_objects:
            invites.append(invite.to_dict())
        trip.append(invites)

        # package boater list
        boater_objects = trip_obj.boaters
        for boater in boater_objects:
            boaters.append(boater.to_dict())
        trip.append(boaters)

        # append main json response with trip package
        trips.append(trip)

    return jsonify(trips=trips), 200


@trip.route('/<id>')
@jwt_required
def trip_by_id(id):
    # return trip
    trip_obj = Trip.query.filter_by(id=id).first()
    trip = trip_obj.to_dict()
    invites = []
    boaters = []
    boats = []
    vehicles = []
    access = []

    # package invite list
    invite_objects = trip_obj.invites
    for invite in invite_objects:
        invites.append(invite.to_dict())

    # package boater list
    boater_objects = trip_obj.boaters
    for boater in boater_objects:
        boaters.append(boater.to_dict())

        # # populate boats list
        # boat = boater['boat_id']
        # boats.append(boat)

        # # populate vehicles list
        # vehicle = boater['vehicle_id']
        # vehicles.append(vehicle)

    # package access points
    putin = Access.query.filter_by(id=trip['put_in']).first()
    takeout = Access.query.filter_by(id=trip['take_out']).first()
    access.append(putin.to_dict())
    access.append(takeout.to_dict())

    river = River.query.filter_by(id=trip['river_id']).first()
    trip_leader = User.query.filter_by(id=trip['trip_leader']).first()

    return jsonify(
        trip=trip,
        invites=invites,
        boaters=boaters,
        boats=boats,
        vehicles=vehicles,
        access=access,
        river=river.to_dict(),
        trip_leader=trip_leader.to_safe_object(),
    ), 200


@trip.route('/<id>/update', methods=["PUT"])
@jwt_required
def update_trip_time(id):
    try:
        data = request.get_json()
        trip = Trip.query.filter_by(id=id).first()
        trip.scheduled_time = data
        db.session.commit()
        return jsonify(message="update trip time success")
    except Exception:
        return jsonify(message="update trip time failure")


@trip.route('/create', methods=["POST", "OPTIONS"])
@jwt_required
def create_trip():
    try:
        data = request.get_json()
        print("HELLO MESSAGE", data)
        # count = Trip.query.count()
        # trip = Trip(
        #     id=count+1,
        #     river_id=data['river'],
        #     trip_leader=data['user'],
        #     put_in=data['putin'],
        #     take_out=data['takeout']
        # )
        # db.session.add(trip)
        # print('before commit -------')
        # db.session.commit()

        # return jsonify(trip_id=count+1), 200
        return jsonify(message="create_trip success"), 200
    except Exception:
        return jsonify(message="create_trip failed"), 400
