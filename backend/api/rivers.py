# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, River


# Blueprint Declaration
river = Blueprint('rivers', __name__)


@river.route('/')
@jwt_required
def rivers_all():
    # return all rivers ordered by name
    river_objects = River.query.order_by(River.name).all()
    rivers = []

    # extract access points
    for river_obj in river_objects:
        river = []
        access_list = []
        access_objects = river_obj.accesses
        for access in access_objects:
            access_list.append(access.to_dict())

        # package river list
        river.append(river_obj.to_dict())
        river.append(access_list)

        # append main json response with river package
        rivers.append(river)
    print(f'rivers --> {rivers}')
    return jsonify(rivers=rivers), 200
