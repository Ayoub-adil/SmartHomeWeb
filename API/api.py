import flask
from flask import request,redirect
import Home
# from flask_mysqldb import MySQL

app = flask.Flask(__name__)

f_end="http://localhost:3000/"
nl,nb,nk,ns,ng=1,2,1,1,1
H=Home.Home(nl,nb,nk,ns,ng)

# DATABASE CONFIG 

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'smarthome'

# mysql = MySQL(app)

# insertion des info du formulaire d'admin dans la table admin dans la BD

# @app.route('/traitementForm')
# def traitementForm():
#     cur = mysql.connection.cursor() == to connect with the DATABASE
#     cur.execute("INSERT INTO admin (login, mdp, n_livingroom, n_Beedroom, n_Kitchen, n_Stairs, n_Garage) VALUES (....)") == 
#     fetchdata = cur.fetchall()
#     cur.close()
#     return "...."
#     redirect ...
# FIN DATABASE CONFIG


@app.route('/home/room')
def active_room():
    return {
        'room':H.r,
        'type':H.type_r
    }

@app.route('/home/plan')
def get_plan():
    return {
        'plan':{
            'livingroom':H.n_livingroom,
            'bedroom':H.n_bedroom,
            'kitchen':H.n_kitchen,
            'stairs':H.n_stairs,
            'garage':H.n_garage
        }
    }
@app.route('/home/lamp')
def get_lamp_state():
    lrlamps=[]
    for i in range(H.n_livingroom):
        lrlamps.append(H.livingrooms[i].lamp)
    brlamps=[]
    for i in range(H.n_bedroom):
        brlamps.append(H.bedrooms[i].lamp)
    return {
        'livingroom':lrlamps,
        'bedroom':brlamps
    }
@app.route('/home/temperature')
def get_temperature():
    templr=[]
    climlr=[]
    for i in range(H.n_livingroom):
        templr.append(H.livingrooms[i].temperature)
        climlr.append(H.livingrooms[i].airConditioner)
    tempbr=[]
    climbr=[]
    for i in range(H.n_bedroom):
        tempbr.append(H.bedrooms[i].temperature)
        climbr.append(H.bedrooms[i].airConditioner)
    return {
        "temperature":{
            'livingroom':templr,
            'bedroom':tempbr
        },
        "airConditioner":{
            'livingroom':climlr,
            'bedroom':climbr
        }
    }
@app.route('/home/window')
def get_window_state():
    windowlr=[]
    for i in range(H.n_livingroom):
        windowlr.append(H.livingrooms[i].window)
    windowbr=[]
    for i in range(H.n_bedroom):
        windowbr.append(H.bedrooms[i].window)
    return {
        'livingroom':windowlr,
        'bedroom':windowbr
    }

  


@app.route('/change/room',methods=["POST","GET"])
def set_room():
    if request.method=='POST':
        rooom=request.form.get("rooom")
        typeOfRoom=request.form.get("typeofroom")
        H.setRoom(typeOfRoom, int(rooom))
        if typeOfRoom=="bedroom":
            return redirect(f_end+'Bedroom')
        if typeOfRoom=="livingroom":
            return redirect(f_end+'Livingroom')
        elif typeOfRoom=="kitchen":
            return redirect(f_end+'kitchen')
    else:
        return "<h1>You shouldn't be here.. </h1>" 



@app.route('/change/lamp')
def set_lamp_state():
    if(H.type_r=='bedroom'):
        if(H.bedrooms[H.r].lamp=="on"):
            H.bedrooms[H.r].lamp="off"
        else:
            H.bedrooms[H.r].lamp="on"
        return "<h1>"+H.type_r+" "+str(H.r+1)+": Lamp is "+H.bedrooms[H.r].lamp+"</h1>"
    elif(H.type_r=='livingroom'):
        if(H.livingrooms[H.r].lamp=="off"):
            H.livingrooms[H.r].lamp="on"
        else:
            H.livingrooms[H.r].lamp="off"
        return "<h1>"+H.type_r+" "+str(H.r+1)+": Lamp is "+H.livingrooms[H.r].lamp+"</h1>"
    return "<h1>You shouldn't be here.. </h1>"   

@app.route('/change/temperature',methods=["POST","GET"])
def set_temperature():
    if request.method=='POST':
        tmp=request.form.get("tmp")
        H.rooms[H.r].temperature=int(tmp)
        return redirect('/frontend')
    return 'room '+str(H.r+1)

@app.route('/change/airConditioner',methods=["POST","GET"])
def set_air_conditioner_state():
    if(H.rooms[H.r].airConditioner=="on"):
        H.rooms[H.r].airConditioner="off"
    else:
        H.rooms[H.r].airConditioner="on"
    return 'room '+str(H.r)

@app.route('/change/window',methods=["POST","GET"])
def set_window_state():
    if(H.type_r=='bedroom'):
        if(H.bedrooms[H.r].window=="opened"):
            H.bedrooms[H.r].window="closed"
        else:
            H.bedrooms[H.r].window="opened"
        return "<h1>"+H.type_r+" "+str(H.r+1)+": window is "+H.bedrooms[H.r].window+"</h1>"
    elif(H.type_r=='livingroom'):
        if(H.livingrooms[H.r].window=="opened"):
            H.livingrooms[H.r].window="closed"
        else:
            H.livingrooms[H.r].window="opened"
        return "<h1>"+H.type_r+" "+str(H.r+1)+": window is "+H.livingrooms[H.r].window+"</h1>"
    return "<h1>You shouldn't be here.. </h1>"

@app.route('/frontend')
def frontend(link=''):
    return redirect(frontend+link)

if __name__ == "__main__":
    app.run(debug=True)