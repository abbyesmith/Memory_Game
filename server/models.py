# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5555
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 
#  

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt




class Cat(db.Model):
    __tablename__ = 'cats'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    breed = db.Column(db.String)
    age = db.Column(db.Integer)

    def __repr__(self):
        return f'<{self.name}: {self.breed} cat, {self.age} years old>'
    
class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'

    serialize_rules = ()

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique = True, nullable=False)
    _password_hash = db.Column(db.String)
    image_url = db.Column(db.String)
    high_score = db.Column(db.Integer)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

    def __repr__(self):
        return f'<Player {self.username}>'