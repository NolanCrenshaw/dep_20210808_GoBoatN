from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.Binary(100), nullable=False)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    zipcode = db.Column(db.String(20), nullable=False)
    about = db.Column(db.Text)
    skill = db.Column(db.Integer)
    profile_pic = db.Column(db.String(255))
    banner_pic = db.Column(db.String(255))
    sprite = db.Column(db.String(255))
    date_added = db.Column(db.DateTime(timezone=True), nullable=False)

    def to_safe_object(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "zipcode": self.zipcode,
            "about": self.about,
            "profile_pic": self.profile_pic,
            "banner_pic": self.banner_pic,
        }


class River(db.Models):
    __tablename__ = "rivers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    class = db.Column(db.Integer)
    length = db.Column(db.Integer)
    description = db.Column(db.Text)
    region = db.Column(db.String(255))
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)

    accesses = db.relationship("Access", backref="user", lazy=True)


class Access(db.Model):
    __tablename__ = "accesses"

    id = db.Column(db.Integer, primary_key=True)
    river_id = db.Column(db.Integer, db.ForeignKey("rivers.id"))
    name = db.Column(db.String(255))
    put_in = db.Column(db.Boolean)
    take_out = db.Column(db.Boolean)


class Trip(db.Models):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime(timezone=True), nullable=False)
    river_id = db.Column(db.Integer, db.ForeignKey("rivers.id"))
    trip_leader = db.Column(db.Integer, db.ForeignKey("users.id"))
    date_added = db.Column(db.DateTime(timezone=True), nullable=False)
