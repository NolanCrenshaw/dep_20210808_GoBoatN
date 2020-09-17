# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, Trip


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

    # package invite list
    invite_objects = trip_obj.invites
    for invite in invite_objects:
        invites.append(invite.to_dict())

    # package boater list
    boater_objects = trip_obj.boaters
    for boater in boater_objects:
        boaters.append(boater.to_dict())

        # populate boats list
        boat = boater['boat_id']
        boats.append(boat)

        # populate vehicles list
        vehicle = boater['vehicle_id']
        vehicles.append(vehicle)

    return jsonify(
        trip,
        invites,
        boaters,
        boats,
        vehicles,
    ), 200
