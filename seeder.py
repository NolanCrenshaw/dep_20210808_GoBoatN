# Package Requirements
from dotenv import load_dotenv
import json
import re
# Access Environment Variables
load_dotenv()

# Local Requirements
from backend import app  # noqa
from backend.models import db, User, River, Access, Boat, Vehicle  # noqa
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

    Demo = User(
        username="DemoUser",
        email="demo@goboatn.com",
        hashed_password=demo_hash,
        firstname="Demo",
        lastname="Rivers",
        zipcode=37409,
    )
    Bob = User(
        username="Bobtest",
        email="bob@test.com",
        hashed_password=hash,
        firstname="Bob",
        lastname="Bobberson",
        zipcode=37409,
    )
    Kim = User(
        username="Kimtest",
        email="kim@test.com",
        hashed_password=hash,
        firstname="Kim",
        lastname="Kimerson",
        zipcode=37409,
    )
    Swym = User(
        username="Swymtest",
        email="swym@test.com",
        hashed_password=hash,
        firstname="Swym",
        lastname="Swymerson",
        zipcode=37409,
    )
    Dog = User(
        username="Dogtest",
        email="dog@test.com",
        hashed_password=hash,
        firstname="Dog",
        lastname="Doggerson",
        zipcode=37409,
    )
    boat_one = Boat(
        name="Huck",
        user_id=1,
        make="Liquid Logic",
        occupancy=1,
    )
    boat_two = Boat(
        name="Pop",
        user_id=1,
        make="Liquid Logic",
        occupancy=1,
    )
    boat_three = Boat(
        name="Dagger",
        user_id=2,
        make="Blisstick",
        occupancy=1,
    )
    boat_four = Boat(
        name="Ranger",
        user_id=3,
        make="Avon",
        occupancy=8,
    )
    boat_five = Boat(
        name="Betsy",
        user_id=3,
        make="Shredder",
        occupancy=2,
    )
    boat_six = Boat(
        name="Martha",
        user_id=4,
        make="Jackson",
        occupancy=1,
    )
    boat_seven = Boat(
        name="Canoe",
        user_id=5,
        make="Old Town",
        occupancy=2,
    )
    vehicle_one = Vehicle(
        name="Tacoma",
        user_id=1,
        make="Toyota",
        occupancy=2,
    )
    vehicle_two = Vehicle(
        name="CRV",
        user_id=2,
        make="Honda",
        occupancy=5,
    )
    vehicle_three = Vehicle(
        name="Grand Caravan",
        user_id=3,
        make="Dodge",
        occupancy=7,
    )
    vehicle_four = Vehicle(
        name="Taurus",
        user_id=4,
        make="Ford",
        occupancy=5,
    )
    vehicle_five = Vehicle(
        name="Wrangler",
        user_id=5,
        make="Jeep",
        occupancy=2,
    )

    db.session.add(Demo)
    db.session.add(Bob)
    db.session.add(Kim)
    db.session.add(Swym)
    db.session.add(Dog)
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

    db.session.commit()

file.close()
