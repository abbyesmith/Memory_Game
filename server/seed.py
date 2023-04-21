from app import app
from models import db, Player, Game, Tile

with app.app_context():
    db.drop_all()
    db.create_all()
    
    print('Deleting data...')
    
    Game.query.delete()
    Tile.query.delete()
    Player.query.delete()
    
    print('Creating players...')
    
    p1 = Player(username = 'Dirty Mike')
    p1.password_hash = "Michael"
    p2 = Player(username = "Abatha")
    p2.password_hash = "Abby"
    p3 = Player(username = "Ben Dover")
    p3.password_hash = "Ben"
    p4 = Player(username = "Van Life")
    p4.password_hash = "Alex"
    p5 = Player(username = "Cwiss")
    p5.password_hash = "Chris"
    p6 = Player(username = "Jo-na-na-nah")
    p6.password_hash = "Jonah"
    p7 = Player(username = "Gagey Poo")
    p7.password_hash = "Gage"
    p8 = Player(username = "Princess Ruffian")
    p8.password_hash = "Dylan"
    p9 = Player(username = "Mr. Glass")
    p9.password_hash = "Matthew"
    p10 = Player(username = "The dark horse")
    p10.password_hash = "Preston"
    
    players = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]
    
            
    db.session.add_all(players)
    db.session.commit()
    
    print('Creating tiles...')
    
    t1 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4JZfpQ6mVj8ln6iivtg2ozj3BlLfD4aXRZg&usqp=CAU')
    t2 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUpKuFE2IyiOg93GdJfY7YL0iXGnRfdkBHw&usqp=CAU')
    t3 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNECPASq1pw7Xma3LjngqyS0438ZWubBT6_A&usqp=CAU')
    t4 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8dNYETUxRctek5phC5h1RuPnyybW21FpqQ&usqp=CAU')
    t5 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShE_ulBMMi7j6WzQOABxEXuwPR_InXAfO7-g&usqp=CAU')
    t6 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR53QAj8iZcyR_RcumtIX5BbcrJ181Mbs9_EzMBavv_Bw&s')
    t7 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoj2N5l7VzXDVPJZtenHNAltUNKh3lK6uQLs_vbsyE&s')
    t8 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMf1fWAOMKms1V1Hh4ECJeRCYB8IsiPgWxWl9d1l8Bzw&s')
    t9 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpsV-LU69YRjJg2M_o89e1d3FL43n0lRuQRQ&usqp=CAU')
    t10 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8M5MP6QxzFucVmNGeC6FJnQPWg0_0eVIU6A&usqp=CAU')
    t11 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjD3TTI7kQbz3aBFe6PxfOglrxRHOzI0p-DQ&usqp=CAU')
    t12 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOlPcuh0Ra2Y7FUAtdWsY6I3ngw50MRH7AFQ&usqp=CAU')
    # t13 = Tile(image_url = ('')
    t14 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmzaWPrX3ijm6B1MExdmlc9yNIcOsd65twCg&usqp=CAU')
    t15 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR63IUamLD9AOJoZucSxkr_PKrw00zkztw5CQ&usqp=CAU')
    t16 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoVYUhL4f_Tbx54zxKOHMYz-bl9qn7q7vHGg&usqp=CAU')
    
    tiles = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t14, t15, t16]
    db.session.add_all(tiles)
    db.session.commit()