import flask
from flask import request,redirect
import Home
# from flask_mysqldb import MySQL

app = flask.Flask(__name__)

nl,nb,nk,ns,ng=1,2,1,1,1
H=Home.Home(nl,nb,nk,ns,ng)
r=-1

# DATABASE CONFIG 

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'smarthome'

# mysql = MySQL(app)

# @app.route('/login')
# def login():
#     cur = mysql.connection.cursor()
#     cur.execute("SELECT * FROM admin")
#     fetchdata = cur.fetchall()
#     cur.close()

# FIN DATABASE CONFIG

@app.route('/lamp')
def get_lamp_state():
    state=[]
    for i in range(H.n_livingroom):
        state.append(H.rooms[i].lamp)
    return {
        'lamp':state
    }
@app.route('/temperature')
def get_temperature():
    temp=[]
    clim=[]
    for i in range(H.n_room):
        temp.append(H.rooms[i].temperature)
        clim.append(H.rooms[i].airConditioner)
    return {
        "temperature":temp,
        "airConditioner":clim 
    }
@app.route('/window')
def get_window_state():
    win=[]
    for i in range(H.n_room):
        win.append(H.rooms[i].window)
    return {
        'window':win
    }

  


@app.route('/setRoom',methods=["POST","GET"])
def set_room():
    if request.method=='POST':
        rooom=request.form.get("rooom")
        typeOfRoom=request.form.get("typeofroom")
        H.setRoom(typeOfRoom, rooom)
        if typeOfRoom=="bedroom":
            return redirect('http://localhost:3000/Bedroom')
        if typeOfRoom=="livingroom":
            return redirect('http://localhost:3000/Livingroom')
        elif typeOfRoom=="kitchen":
            return redirect('http://localhost:3000/kitchen')

@app.route('/activeRoom')
def active_room():
    return ' ' + str(H.r)

@app.route('/setLamp')
def set_lamp_state():
    if(H.rooms[r].lamp=="on"):
        H.rooms[r].lamp="off"
    else:
        H.rooms[r].lamp="on"
    return 'room '+str(r)   

@app.route('/setTemperature',methods=["POST","GET"])
def set_temperature():
    if request.method=='POST':
        tmp=request.form.get("tmp")
        H.rooms[r].temperature=int(tmp)
        return redirect('/frontend')
    return 'room '+str(r+1)

@app.route('/setAirConditioner',methods=["POST","GET"])
def set_air_conditioner_state():
    if(H.rooms[r].airConditioner=="on"):
        H.rooms[r].airConditioner="off"
    else:
        H.rooms[r].airConditioner="on"
    return 'room '+str(r)
@app.route('/setWindow',methods=["POST","GET"])
def set_window_state():
    if(H.rooms[r].window=="opened"):
        H.rooms[r].window="closed"
    else:
        H.rooms[r].window="opened"
    return 'room '+str(r)


@app.route('/plan')
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
    
@app.route('/getpost',methods=["POST","GET"])
def getpost():
    if request.method=="GET":
        return '''
        <form method='post'>
        <input type='text' name='first'/>
        <input type='text' name='last'/>
        <input type='submit'/>
        </form>
        '''
    if request.method=="POST":
        first=request.form.get('first')
        last=request.form.get('last')
        return f'''
        Hello <strong>{first} {last}</strong>
        '''

@app.route('/frontend')
def frontend():
    return redirect("http://localhost:3000")

if __name__ == "__main__":
    app.run(debug=True)