# -- River Runner --
# -- >>> React/Flask/Postgres --
# -- >>> by Nolan Crenshaw --
# -- >>> app.py <<< -- (serves as "__init__.py")


# PIPENV Requirements
import os
from flask import Flask, render_template, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# Local Requirements
from models import db
from config import Config
from auth import auth


# Declarations
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
jwt = JWTManager(app)
db.init_app(app)


# Blueprint Registration
app.register_blueprint(auth, url_prefix='/auth')
