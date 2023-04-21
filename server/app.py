# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5555
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 
#  

#!/usr/bin/env python3

from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


from config import app, db, api
from models import Tile, Player, Game


@app.route('/')
def index():
    return '<h1>Memory Backend</h1>'

class Signup(Resource):

    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')
        

        player = Player(
            username=username,
            
        )

        # the setter will encrypt this:
        player.password_hash = password

        print('first')

        try:

            print('here!')

            db.session.add(player)
            db.session.commit()

            session['player_id'] = player.id
            
            print (player.to_dict(), 201)
        
        except IntegrityError:

            print ('no, here!')

            return {'error': '422 Unprocessable Entity'}, 422

api.add_resource(Signup, '/signup', endpoint='signup')


class CheckSession(Resource):
    
    def get(self):
        if session.get('player_id'):
            player = Player.query.filter(Player.id == session['player_id']).first()
            return player.to_dict(), 200
        
        return {'error': '401 Unauthorized'}, 401

api.add_resource(CheckSession, '/check_session', endpoint='check_session')


class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        player = Player.query.filter(Player.username == username).first()

        if player:
            if player.authenticate(password):
                print("authenticat")
                session['player_id'] = player.id
                return player.to_dict(), 200
        
        return make_response({'error': '401 Unauthorized'},401) 

api.add_resource(Login, '/login', endpoint='login')


class Logout(Resource):
    
    def delete(self):

        if session.get('player_id'):
            session['player_id'] = None
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401

api.add_resource(Logout, '/logout', endpoint='logout')

class HighScore(Resource):
    # def get(self,id):
    #     one_student = Student.query.filter(Student.id == id).first()
    #     res = make_response(jsonify(one_student.to_dict()),200)
    #     return res

    def get(self,id):
        one_player = Player.query.filter(Player.id == id).first()
        res = make_response(jsonify(one_player.to_dict()),200)
        return res
# doesn't like to_dict
    
    def patch(self, id):
        one_player = Player.query.filter(Player.id == id).first()
        data = request.get_json()
        for attr in data:
            setattr(one_player, attr, data[attr])
        db.session.add(one_player)
        db.session.commit()
        res = make_response(jsonify(one_player.to_dict()), 200)
        return res
api.add_resource(HighScore, '/highscore/<int:id>', endpoint='highscore/<int:id>')

class AllPlayers(Resource):
    def get(self):
        all_play = Player.query.all()
        all_players = []
        for play in all_play:
            all_players.append(play.to_dict())
        res = make_response(jsonify(all_players), 200)
        return res

api.add_resource(AllPlayers, '/players')

        # print("restful")
        # all_cust = Customer.query.all()
        # all_customer = []
        # for cust in all_cust:
        #     all_customer.append(cust.to_dict())
        # res = make_response(jsonify(all_customer),200)
        # return res


class All_Tiles(Resource):
    def get(self):
        all_tiles = Tile.query.all()
        tile_list = []
        
        for tile in all_tiles:
            # new_tile = {
            #     "image_url": tile.image_url
            # }
            tile_list.append(tile.to_dict())
        return make_response(jsonify(tile_list), 200)
    
    def post(self):
        data = request.get_json()
        new_tile = Tile(
            image_url = data['image_url']
        )
        db.session.add(new_tile)
        db.session.commit()
        return make_response(new_tile.to_dict(), 201)
           
       

api.add_resource(All_Tiles, '/tiles')

class Tiles_By_Id(Resource):
    
    def get(self, id):
        tile = Tile.query.filter_by(id = id).first()
        res = make_response(jsonify(tile.to_dict()), 200)
        return res
    
    def delete(self, id):
        tile = Tile.query.filter(Tile.id == id).first()
        db.session.delete(tile)
        db.session.commit()
        return make_response(jsonify(tile.to_dict()), 200)
        
    
api.add_resource(Tiles_By_Id, '/tiles/<int:id>')

class All_Games(Resource):
    def get(self):
        all_games = Game.query.all()
        all_games_list = []
        for game in all_games:
            all_games_list.append(game.to_dict())
        res = make_response(jsonify(all_games_list), 200)
        return res
    
    def post(self):
        data = request.get_json()
        print(data)
        new_game = Game(
           player_id = data['player_id'],
           tile_id = data['tile_id'] 
        )
        db.session.add(new_game)
        db.session.commit()
        return make_response(jsonify(new_game.to_dict()), 201)
    
    def delete(self):
        all_games = Game.query.all()
        for game in all_games:
            db.session.delete(game)
        db.session.commit()
        return make_response(jsonify({}), 204)

api.add_resource(All_Games, '/games')

if __name__ == '__main__':
    app.run(port=5555, debug=True)