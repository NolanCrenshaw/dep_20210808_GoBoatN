# Package Requirements
from dotenv import load_dotenv
from datetime import datetime

# Local Requirements
from backend import app, db
from backend.models import User
from backend.auth import set_password

# Access Environment Variables
load_dotenv()

hash = set_password("password")

with app.app_context():
    db.drop_all()
    db.create_all()

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

    db.session.add(Bob)
    db.session.add(Kim)
    db.session.add(Swym)
    db.session.add(Dog)
    db.session.commit()
