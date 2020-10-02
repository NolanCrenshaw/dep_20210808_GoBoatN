# Package Requirements
from dotenv import load_dotenv
import json
import re
# Access Environment Variables
load_dotenv()

# Local Requirements
from backend import app  # noqa
from backend.models import (
    db,
    User,
    River,
    Access,
    Boat,
    Vehicle,
    Trip,
    Boater,
    Friend,
)  # noqa
from backend.auth import set_password  # noqa


file = open('./seeder/tn_rivers.jl')
hash = set_password("password")
demo_hash = set_password("demoShow123")
river_index = 1
access_index = 1
pattern = r'\n'


with app.app_context():
    db.drop_all()
    db.create_all()

    # Create Tennessee Rivers and Access Points
    for line in file:
        res = json.loads(line)
        name_obj = res['name']
        first_split = name_obj.split(':')
        name = first_split[0]
        access = first_split[1].split(' to ')

        if len(access) == 2:

            put_in = res['putin'].split(',')
            put_in_lat = re.sub(pattern, '', put_in[0])
            put_in_lon = re.sub(pattern, '', put_in[1])
            take_out = res['takeout'].split(',')
            take_out_lat = re.sub(pattern, '', take_out[0])
            take_out_lon = re.sub(pattern, '', take_out[1])

            river = River(
                id=river_index,
                name=name,
                region="Tennessee"
            )
            print(river.id)
            access_one = Access(
                id=access_index,
                river_id=river_index,
                name=access[0].strip(),
                put_in_option=True,
                latitude=put_in_lat,
                longitude=put_in_lon
            )
            access_index += 1
            access_two = Access(
                id=access_index,
                river_id=river_index,
                name=access[1].strip(),
                take_out_option=True,
                latitude=take_out_lat,
                longitude=take_out_lon
            )
            access_index += 1
            river_index += 1

            db.session.add(river)
            db.session.add(access_one)
            db.session.add(access_two)

    db.session.commit()

    Demo = User(
        username="DemoUser",
        email="demo@goboatn.com",
        hashed_password=demo_hash,
        firstname="Mary",
        lastname="Rivers",
        zipcode=37409,
        profile_pic="demoUser_profile_pic.png"
    )
    Bob = User(
        username="Bobtest",
        email="bob@test.com",
        hashed_password=hash,
        firstname="Bob",
        lastname="Bobberson",
        zipcode=37409,
        profile_pic="Image_from_iOS_4.png"
    )
    Kim = User(
        username="Kimtest",
        email="kim@test.com",
        hashed_password=hash,
        firstname="Kim",
        lastname="Kimerson",
        zipcode=37409,
        profile_pic="Image_from_iOS_2.png"
    )
    Swym = User(
        username="Swymtest",
        email="swym@test.com",
        hashed_password=hash,
        firstname="Swym",
        lastname="Swymerson",
        zipcode=37409,
        profile_pic="Image_from_iOS.png"
    )
    boat_one = Boat(
        name="Huck",
        user_id=3,
        make="Liquid Logic",
        occupancy=1,
        sprite="playBoatSprite.png"
    )
    boat_two = Boat(
        name="Pop",
        user_id=1,
        make="Liquid Logic",
        occupancy=1,
        sprite="playBoatSprite.png"
    )
    boat_three = Boat(
        name="Dagger",
        user_id=2,
        make="Blisstick",
        occupancy=1,
        sprite="playBoatSprite.png"
    )
    boat_four = Boat(
        name="Ranger",
        user_id=1,
        make="Avon",
        occupancy=8,
        sprite="raftSprite.png"
    )
    boat_five = Boat(
        name="Betsy",
        user_id=3,
        make="Shredder",
        occupancy=2,
        sprite="raftSprite.png"
    )
    boat_six = Boat(
        name="Martha",
        user_id=4,
        make="Jackson",
        occupancy=1,
        sprite="playBoatSprite.png"
    )
    boat_seven = Boat(
        name="My Canoe",
        user_id=1,
        make="Old Town",
        occupancy=2,
        sprite="canoeSprite.png"
    )
    vehicle_one = Vehicle(
        name="Tacoma",
        user_id=1,
        make="Toyota",
        occupancy=2,
        sprite="pickupSprite.png"
    )
    vehicle_two = Vehicle(
        name="CRV",
        user_id=2,
        make="Honda",
        occupancy=5,
        sprite="suvSprite.png"
    )
    vehicle_three = Vehicle(
        name="Grand Caravan",
        user_id=3,
        make="Dodge",
        occupancy=7,
        sprite="suvSprite.png"
    )
    vehicle_four = Vehicle(
        name="Taurus",
        user_id=4,
        make="Ford",
        occupancy=5,
        sprite="carSprite.png"
    )
    vehicle_five = Vehicle(
        name="Wrangler",
        user_id=2,
        make="Jeep",
        occupancy=2,
        sprite="pickupSprite.png"
    )
    boater_one = Boater(
        trip_id=1,
        user_id=2,
    )
    boater_two = Boater(
        trip_id=1,
        user_id=3
    )
    boater_three = Boater(
        trip_id=2,
        user_id=1,
    )
    friend_one = Friend(
        user_id=1,
        friend_id=2
    )
    friend_two = Friend(
        user_id=1,
        friend_id=3
    )
    friend_three = Friend(
        user_id=1,
        friend_id=4
    )

    db.session.add(Demo)
    db.session.add(Bob)
    db.session.add(Kim)
    db.session.add(Swym)
    db.session.add(boat_one)
    db.session.add(boat_two)
    db.session.add(boat_three)
    db.session.add(boat_four)
    db.session.add(boat_five)
    db.session.add(boat_six)
    db.session.add(boat_seven)
    db.session.add(vehicle_one)
    db.session.add(vehicle_two)
    db.session.add(vehicle_three)
    db.session.add(vehicle_four)
    db.session.add(vehicle_five)
    db.session.add(trip_one)
    db.session.add(trip_two)
    db.session.add(boater_one)
    db.session.add(boater_two)
    db.session.add(boater_three)
    db.session.add(friend_one)
    db.session.add(friend_two)
    db.session.add(friend_three)

    db.session.commit()

file.close()
