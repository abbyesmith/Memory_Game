# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5555
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 
#  


from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt




class Tile(db.Model, SerializerMixin):
    __tablename__ = 'tiles'

    serialize_rules = ('-games.tiles', '-games.player')
    
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String)
    

   
class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'

    serialize_rules = ('-games.tiles', '-games.player')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique = True, nullable=False)
    _password_hash = db.Column(db.String)
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
    
    
class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'
    
    serialize_rules = ('-tiles.games', '-player.games')
    
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    tile_id = db.Column(db.Integer, db.ForeignKey('tiles.id'))
    
    player = db.relationship('Player', backref='games')
    tiles = db.relationship('Tile', backref='games')