# Package Requirements
from dotenv import load_dotenv
# Access Environment Variables
load_dotenv()

from datetime import datetime  # noqa

# Local Requirements
from backend import app  # noqa
from backend.models import db, User  # noqa
from backend.auth import set_password  # noqa


hash = set_password("password")
demo_hash = set_password("demoShow123")

with app.app_context():
    db.drop_all()
    db.create_all()

    Demo = User(
        username="DemoUser",
        email="demo@goboatn.com",
        hashed_password=demo_hash,
        firstname="Demo",
        lastname="Rivers",
        zipcode=37409,
        date_added=datetime.now(),
        profile_pic="../images/jpg/demoUser_profile_pic.png"
    )

    Bob = User(
        username="Bobtest",
        email="bob@test.com",
        hashed_password=hash,
        firstname="Bob",
        lastname="Bobberson",
        zipcode=37409,
        date_added=datetime.now()
    )
    Kim = User(
        username="Kimtest",
        email="kim@test.com",
        hashed_password=hash,
        firstname="Kim",
        lastname="Kimerson",
        zipcode=37409,
        date_added=datetime.now()
    )
    Swym = User(
        username="Swymtest",
        email="swym@test.com",
        hashed_password=hash,
        firstname="Swym",
        lastname="Swymerson",
        zipcode=37409,
        date_added=datetime.now()
    )
    Dog = User(
        username="Dogtest",
        email="dog@test.com",
        hashed_password=hash,
        firstname="Dog",
        lastname="Doggerson",
        zipcode=37409,
        date_added=datetime.now()
    )

    db.session.add(Demo)
    db.session.add(Bob)
    db.session.add(Kim)
    db.session.add(Swym)
    db.session.add(Dog)
    db.session.commit()
