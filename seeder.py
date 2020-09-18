# Package Requirements
from dotenv import load_dotenv
import json
import re
# Access Environment Variables
load_dotenv()

# Local Requirements
from backend import app  # noqa
from backend.models import db, User, River, Access, Boat  # noqa
from backend.auth import set_password  # noqa


file = open('./seeder/tn_rivers.jl')
hash = set_password("password")
demo_hash = set_password("demoShow123")
i = 1
pattern = r'\n'

for line in file:
    res = json.loads(line)
    name = res['name']
    first_split = name.split(':')
    realname = first_split[0]
    access = first_split[1].split(' to ')
    if len(access) == 2:
        print('-----')
        print(i)
        i += 1
        print(realname)
        put_in = res['putin'].split(',')
        put_in_lat = re.sub(pattern, '', put_in[0])
        put_in_lon = re.sub(pattern, '', put_in[1])
        print(put_in_lat)
        print(put_in_lon)
        take_out = res['takeout']
        print(take_out)
        for spot in access:
            print(spot)
        print('-----')
    # river = River(
    #     id=i,
    #     name=res['name'],
    #     class_designation=res['class']
    # )
    # print(river)
    # print(i)
    # i += 1


# with app.app_context():
#     db.drop_all()
#     db.create_all()

#     Demo = User(
#         username="DemoUser",
#         email="demo@goboatn.com",
#         hashed_password=demo_hash,
#         firstname="Demo",
#         lastname="Rivers",
#         zipcode=37409,
#     )
#     Bob = User(
#         username="Bobtest",
#         email="bob@test.com",
#         hashed_password=hash,
#         firstname="Bob",
#         lastname="Bobberson",
#         zipcode=37409,
#     )
#     Kim = User(
#         username="Kimtest",
#         email="kim@test.com",
#         hashed_password=hash,
#         firstname="Kim",
#         lastname="Kimerson",
#         zipcode=37409,
#     )
#     Swym = User(
#         username="Swymtest",
#         email="swym@test.com",
#         hashed_password=hash,
#         firstname="Swym",
#         lastname="Swymerson",
#         zipcode=37409,
#     )
#     Dog = User(
#         username="Dogtest",
#         email="dog@test.com",
#         hashed_password=hash,
#         firstname="Dog",
#         lastname="Doggerson",
#         zipcode=37409,
#     )
#     # Ocoee = River(
#     #     name="Ocoee",
#     #     class_designation=3,
#     #     length=5,
#     # )
#     # Chattooga = River(
#     #     name="Chattooga"
#     # )
#     # Ocoee_putin = Access(
#     #     river_id=1,
#     #     name="Dam #2",
#     #     put_in_option=True,
#     #     take_out_option=False,
#     #     latitude=35.082900,
#     #     longitude=-84.491800,
#     # )
#     # Ocoee_takeout = Access(
#     #     river_id=1,
#     #     name="Dam #1",
#     #     put_in_option=False,
#     #     take_out_option=True,
#     #     latitude=35.096300,
#     #     longitude=-84.548100,
#     # )
#     Longboat = Boat(
#         name="Huck",
#         user_id=1,
#         make="Liquid Logic",
#         occupancy=1,
#     )
#     Playboat = Boat(
#         name="Pop",
#         user_id=1,
#         make="Liquid Logic",
#         occupancy=1,
#     )
#     db.session.add(Demo)
#     db.session.add(Bob)
#     db.session.add(Kim)
#     db.session.add(Swym)
#     db.session.add(Dog)
#     # db.session.add(Ocoee)
#     # db.session.add(Chattooga)
#     # db.session.add(Ocoee_putin)
#     # db.session.add(Ocoee_takeout)
#     db.session.add(Longboat)
#     db.session.add(Playboat)

#     for line in file:
#         res = json.loads(line)
#         print(f'line --> {res.keys()}')

#     db.session.commit()
