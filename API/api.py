import flask
from flask import request,redirect
import Home

app = flask.Flask(__name__)


nr,nk,ns,ng=2,1,1,1
H=Home.Home(nr,nk,ns,ng)
r=0

@app.route('/lamp')
def get_lamp_state():
    state=[]
    for i in range(H.n_room):
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
            'room':H.n_room,
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