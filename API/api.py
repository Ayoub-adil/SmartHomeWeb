import flask
from flask import request,redirect,session
import Home
# from flask_mysqldb import MySQL
# import MySQLdb.cursors

app = flask.Flask(__name__)

f_end="http://localhost:3000/"

secretlogin="SuperAdmin"
secretpsw="1234"

nl,nb,nk,ns,ng=5,4,2,1,1
H=Home.Home(nl,nb,nk,ns,ng)

#**********************************************************************************************************************************
#**********************************************************************************************************************************
@app.route('/')
def landing():
    return "<h1>Home Simulator Server</h1>"+"<h2>You shouldn't be here.. </h2>"+"<h3>This server is not for users.. SORRY</h3>"


@app.route('/frontend')
def frontend(link=''):
    return redirect(f_end+link)
#**********************************************************************************************************************************
#**********************************************************************************************************************************
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

@app.route('/home/outsideTemperature')
def get_outside_temperature():
    outsideT=H.outsideT
    rain=H.rain
    return {
        "outsideTemperature":outsideT,
        "rain":rain
    } 
    
@app.route('/home/door')
def get_door():
    door=H.lock
    return {
        "door":door,
    } 
    
@app.route('/home/garageDoor')
def get_garage_door():
    door=H.garages[0].door
    return {
        "garageDoor":door,
    }

@app.route('/home/alert')
def get_alert():
    return {
        'alert':H.alert,
        'watering':H.watering
    } 
#**********************************************************************************************************************************
#**********************************************************************************************************************************
@app.route('/home/room')
def active_room():
    return {
        'room':H.r,
        'type':H.type_r
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
    windowk=[]
    for i in range(H.n_kitchen):
        windowk.append(H.kitchens[i].window)
    return {
        'livingroom':windowlr,
        'bedroom':windowbr,
        'kitchen':windowk
    }
    
@app.route('/home/smoke')
def get_smoke_state():
    ksmoke=[]
    for i in range(H.n_kitchen):
        ksmoke.append(H.kitchens[i].smoke)
    gsmoke=[]
    for i in range(H.n_garage):
        gsmoke.append(H.garages[i].smoke)
    ssmoke=[]
    for i in range(H.n_stairs):
        ssmoke.append(H.stairs[i].smoke)
    return {
        'kitchen':ksmoke,
        'garage':gsmoke,
        'stairs':ssmoke
    }
        
@app.route('/home/mvtLight')
def get_mvt_state():
    return {
        'mvt':H.hallLight
    }
#**********************************************************************************************************************************
#**********************************************************************************************************************************
@app.route('/change/room',methods=["POST","GET"])
def set_room():
    if request.method=='POST':
        rooom=request.form.get("rooom")
        typeOfRoom=request.form.get("typeofroom")
        H.setRoom(typeOfRoom, int(rooom))
        return redirect(f_end+H.type_r)
        # if typeOfRoom=="bedroom":
        #     return redirect(f_end+'Bedroom')
        # if typeOfRoom=="livingroom":
        #     return redirect(f_end+'Livingroom')
        # elif typeOfRoom=="kitchen":
        #     return redirect(f_end+'kitchen')
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
        tmp=request.form.get('tmp')
        if H.type_r=='bedroom':
            H.bedrooms[H.r].temperature=int(tmp)
        elif H.type_r=='livingroom':
            H.livingrooms[H.r].temperature=int(tmp)
        return redirect(f_end+H.type_r)
    return "<h1>You shouldn't be here.. </h1>"

@app.route('/change/airConditioner',methods=["POST","GET"])
def set_air_conditioner_state():
    if(H.type_r=='bedroom'):
        if(H.bedrooms[H.r].airConditioner=="on"):
            H.bedrooms[H.r].airConditioner="off"
        else:
            H.bedrooms[H.r].airConditioner="on"
        return "<h1>"+H.type_r+" "+str(H.r+1)+": Air Conditioner is "+H.bedrooms[H.r].airConditioner+"</h1>"
    elif(H.type_r=='livingroom'):
        if(H.livingrooms[H.r].airConditioner=="on"):
            H.livingrooms[H.r].airConditioner="off"
        else:
            H.livingrooms[H.r].airConditioner="on"
        return "<h1>"+H.type_r+" "+str(H.r+1)+": Air Conditioner is "+H.bedrooms[H.r].airConditioner+"</h1>"
    return "<h1>You shouldn't be here.. </h1>"

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
    elif(H.type_r=='kitchen'):
        if(H.kitchens[H.r].window=="opened"):
            H.kitchens[H.r].window="closed"
        else:
            H.kitchens[H.r].window="opened"
        return "<h1>"+H.type_r+" "+str(H.r+1)+": window is "+H.kitchens[H.r].window+"</h1>"
    return "<h1>You shouldn't be here.. </h1>"

@app.route('/change/door')
def set_door_state():
    H.lock=not H.lock
    if H.lock:
        return "<h1>The Door is Locked</h1>"  
    return "<h1>The Door is Unlocked</h1>"

@app.route('/change/garageDoor')
def set_garage_door_state():
    if (H.garages[0].door=='opened'):
        #return "<h1> opened </h1>"
        H.garages[0].door='closed'
    else:
        #return "<h1> closed </h1>"
        H.garages[0].door='opened'
    return "<h1>The Garage Door is "+ H.garages[0].door +"</h1>"
    
@app.route('/change/alert')
def set_alert():
    if H.alert=='on':
        H.alert='off'
        return "<h1>The Alert is off</h1>"
    else:
        H.alert='on' 
        return "<h1>The Alert is on</h1>"
    return "<h1>You shouldn't be here.. </h1>"    

@app.route('/change/watering')
def set_watering():
    if H.watering=='on':
        H.watering='off'
        return "<h1>The watering is off</h1>"
    else:
        H.watering='on' 
        return "<h1>The watering is on</h1>"
    return "<h1>You shouldn't be here.. </h1>"
    
@app.route('/change/mvtLight')
def set_mvt_light():
    H.hallLight=not H.hallLight
    return "<h1>You shouldn't be here.. </h1>"
#**********************************************************************************************************************************
#**********************************************************************************************************************************
#**********************************************************************************************************************************

# # DATABASE CONFIG 
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'smarthome'

# # Intialize MySQL
# mysql = MySQL(app)

# # insertion des info du formulaire d'admin dans la table admin dans la BD

# @app.route('/traitementForm', methods=['GET', 'POST'])
# def traitementForm():
#     if request.method=='POST':
#         log=request.form.get("log")
#         psw=request.form.get("psw")
#         nlr=request.form.get("nlr")
#         nbr=request.form.get("nbr")
#         nk=request.form.get("nk")
#         ns=request.form.get("ns")
#         ng=request.form.get("ng")

#     #     return {
#     #         'login':log,
#     #         'password':psw,
#     #         'livingRooms':nlr,
#     #         'bedroom':nbr,
#     #         'kitchen':nk,
#     #         'stairs':ns,
#     #         'garage':ng
#     #     }
#     # return "<h1>You shouldn't be here <h1>"

#         cur = mysql.connection.cursor() # to connect with the DATABASE
#         cur.execute("INSERT INTO admin ( login, mdp, n_livingroom, n_bedroom, n_kitchen, n_garage, n_stairs) VALUES ("'+log+','+psw+','+nlr+','+nbr+','+nk+','+ng+','+ns+'")")
#         fetchdata = cur.fetchall()
#         cur.close()
#         return redirect(f_end+'console') # redirect(URL_page_admin) soit "http://localhost:3000/console"




# # @app.route('/login', methods=['GET', 'POST'])
# # def login():

# # # check if username and password exist in the form
# #     if request.method == 'POST' and 'log' in request.form and 'psw' in request.form:
# #         log=request.form.get("log")
# #         psw=request.form.get("psw")
    
# #     cur = mysql.connection.cursor() 
# #     cur.execute('SELECT * FROM admin WHERE login = %s AND mdp = %s', (log, psw))
# #     donnee = cur.fetchall()

# # #condition
# #     if donnee:
# # #Create session data
# #         session['login'] = donnee['log']
# #         return redirect(f_end+'Home')
# #         # return 'Logged in successfully!'
# #     else:
# # #Account doesnt exist or username/password incorrect
# #         return redirect(f_end+'SignIn')
# #         msg = 'Incorrect username/password!'






# # @app.route('/SuperAdmin/dashboard', methods=['GET', 'POST'])
# # def dashboard():

# #     cur = mysql.connection.cursor() 
# #     cursor.execute('SELECT * FROM admin')
# #     donnee = cur.fetchall()
# # # je dois afficher selon des <td> f le tableau dashboard: HOW !!






# @app.route('/SuperAdmin/loginDirecteur', methods=['GET', 'POST'])
# def loginDirecteur():

#     secretlogin = "superadmin"
#     secretpsw = "123"

# # creer des variables internes pour le login et mdp du directeur
# # definition hors fonction sous raison de la portée des variables

# # check if username and password exist in the form
#     if request.method == 'POST': #and 'username' in request.form and 'password' in request.form:
#         log = request.form.get("username")
#         psw = request.form.get("password")
#         # return {
#         # 'login':log,
#         # 'password':psw
#         # }
        
# # verification
#         if log == secretlogin and psw == secretpsw :
#             return redirect(f_end+'console')
#         # return 'Logged in successfully!'
#         else:
# #message d'erreur
#             return redirect(f_end+'login')
        # msg = 'Incorrect username/password!'

# # FIN DATABASE CONFIG

#**********************************************************************************************************************************
#**********************************************************************************************************************************
if __name__ == "__main__":
    app.run(debug=True , host='0.0.0.0')