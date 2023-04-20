


from app import app
from models import db, Player, Game, Tile

with app.app_context():
    db.drop_all()
    db.create_all()
    
    print('Deleting data...')
    
    Game.query.delete()
    Tile.query.delete()
    
    print('Creating tiles...')
    
    t1 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4JZfpQ6mVj8ln6iivtg2ozj3BlLfD4aXRZg&usqp=CAU')
    t2 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUpKuFE2IyiOg93GdJfY7YL0iXGnRfdkBHw&usqp=CAU')
    t3 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNECPASq1pw7Xma3LjngqyS0438ZWubBT6_A&usqp=CAU')
    t4 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8dNYETUxRctek5phC5h1RuPnyybW21FpqQ&usqp=CAU')
    t5 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShE_ulBMMi7j6WzQOABxEXuwPR_InXAfO7-g&usqp=CAU')
    t6 = Tile(image_url = 'https://www.alamy.com/stock-photo-nicolas-cage-who-is-an-american-actor-may-1987-20135664.html?imageid=E32C2975-F6A6-4AA5-964D-E56E3E97E3D6&p=62486&pn=1&searchId=f327ae3a17a670e3166d7f5e453c7a6f&searchtype=0')
    t7 = Tile(image_url = 'https://www.alamy.com/stock-photo-nicolas-cage-visits-live-with-regis-and-kelly-taping-out-and-about-38193934.html?imageid=9184C68A-7963-45F9-A352-07242930F02F&p=96050&pn=1&searchId=f327ae3a17a670e3166d7f5e453c7a6f&searchtype=0')
    t8 = Tile(image_url = 'https://www.alamy.com/stock-photo-spiel-auf-zeit-snake-eyes-nicolas-cage-rick-santoro-nicolas-cage-laesst-52949774.html?imageid=C930FF2C-F4E8-4A19-B8CC-927FC83493A4&p=1238264&pn=1&searchId=f327ae3a17a670e3166d7f5e453c7a6f&searchtype=0')
    
    tiles = [t1, t2, t3, t4, t5, t6, t7, t8]
    db.session.add_all(tiles)
    db.session.commit()