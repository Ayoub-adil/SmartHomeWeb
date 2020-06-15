import flask
from flask import request,redirect,session, jsonify
import Home

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Firebase Config
cred = credentials.Certificate("./API/db-fb-1609e-firebase-adminsdk-f948g-0bcbc6ee26.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = flask.Flask(__name__)
app.secret_key='irm'

f_end="http://192.168.1.12:3000/"

secretlogin="SuperAdmin"
secretpsw="1234"

H=Home.Home()
#**********************************************************************************************************************************
@app.route('/')
def landing():
    return "<h1>Home Simulator Server</h1>"+"<h2>You shouldn't be here.. </h2>"+"<h3>This server is not for users.. SORRY</h3>"


@app.route('/frontend')
def frontend(link=''):
    return redirect(f_end+link)

@app.route('/server')
def server():
    return {"server":True} 

@app.route('/session')
def session():
    return {"user":H.user} 
    
@app.route('/connect')
def connect():
    return redirect(f_end+'SignIn')
@app.route('/disconnect')
def disconnect():
    H.user='User'
    H.simulate(0,0,0,0,0)
    return "<h1>You are out of Home</h1>"
    # return H.user
    # return redirect(f_end)
#**********************************************************************************************************************************
@app.route('/home/plan')
def get_plan():
    return {
        'plan':{
            'livingroom':H.nl,
            'bedroom':H.nb,
            'kitchen':H.nk,
            'stairs':H.ns,
            'garage':H.ng
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
    for i in range(H.nl):
        lrlamps.append(H.livingrooms[i].lamp)
    brlamps=[]
    for i in range(H.nb):
        brlamps.append(H.bedrooms[i].lamp)
    return {
        'livingroom':lrlamps,
        'bedroom':brlamps
    }

@app.route('/home/temperature')
def get_temperature():
    templr=[]
    climlr=[]
    for i in range(H.nl):
        templr.append(H.livingrooms[i].temperature)
        climlr.append(H.livingrooms[i].airConditioner)
    tempbr=[]
    climbr=[]
    for i in range(H.nb):
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
    for i in range(H.nl):
        windowlr.append(H.livingrooms[i].window)
    windowbr=[]
    for i in range(H.nb):
        windowbr.append(H.bedrooms[i].window)
    windowk=[]
    for i in range(H.nk):
        windowk.append(H.kitchens[i].window)
    return {
        'livingroom':windowlr,
        'bedroom':windowbr,
        'kitchen':windowk
    }
    
@app.route('/home/smoke')
def get_smoke_state():
    ksmoke=[]
    for i in range(H.nk):
        ksmoke.append(H.kitchens[i].smoke)
    gsmoke=[]
    for i in range(H.ng):
        gsmoke.append(H.garages[i].smoke)
    ssmoke=[]
    for i in range(H.ns):
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
        H.garages[0].door='closed'
    else:
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

#********************************************** Authentification SuperAdmin ************************************************************

@app.route('/SuperAdmin/message')
def message():
    H.msg="pas de message"
    return {"msg":H.msg}

@app.route('/SuperAdmin/loginDirecteur', methods=['GET', 'POST'])
def loginDirecteur():

# check if username and password exist in the form
    if request.method == 'POST': #and 'username' in request.form and 'password' in request.form:
        
        username = request.form.get("username")
        psw = request.form.get("password")
# verification
        if username == secretlogin and psw == secretpsw :
            return redirect(f_end+'console')
        # return 'Logged in successfully!'
        else:
            # message d'erreur
            H.msg="Your login/password are incorrect, try again!"
            # H.msg = "err"
            return redirect(f_end+'login')
    else:
        return "<h1>You shouldn't be here.. </h1>"


# # DATABASE 

#********************************************** Authentification Users | FIREBASE ************************************************************


# SignIn users : 
@app.route('/user/login', methods=['GET', 'POST'])
def login():

    # doc_ref = db.collection(u'users').document(u'admin')
    # doc = doc_ref.get().to_dict()
    # email=doc["login"]
    # passw=doc["psw"]
    # print(email+" "+passw)
    
    #recuperer l'email et le mot de passe saisi par l'utilisateur
    if request.method == 'POST': 
        # session.pop('login',None)
        login = request.form.get("log")
        psw = request.form.get("psw")

        doc_ref = db.collection(u'users').document(login)
        doc = doc_ref.get()
        #verif si le nom d'utilisateur existe 
        if doc.exists:
            doc =doc.to_dict()
            passw=doc["psw"]
                
            # verif du mdp
            if passw == psw :
                nl=int(doc["livingroom"])
                nb=int(doc["bednum"])
                nk=int(doc["kitchen"])
                ns=int(doc["stairs"])
                nbrg=doc["garage"]
                if nbrg == "on":
                    ng = 1
                else :
                    ng = 0
                H.simulate(nl,nb,nk,ns,ng)
                # session['login']=login
                H.user=login
                return redirect(f_end+'Home')
            # connex reussie
            else:
                H.msg="Incorrect password"
            #error
                return redirect(f_end+'SignIn')
        else:
            #error
            H.msg="Inexistant account"
            return redirect(f_end+'SignIn')
    else:
        return {"msg":H.msg}
            
#****************************************************** Stockage des données dans la BD | form Add Admin **************************************************************

@app.route('/spForm', methods=['GET', 'POST'])
def AddAdmin():
    
    #recuperation du formulaire
    if request.method == 'POST':
        login=request.form.get("log")
        psw=request.form.get("psw")
        livingroom=request.form.get("nlr")
        bednum=request.form.get("nbr")
        kitchen=request.form.get("nk")
        stairs=request.form.get("ns")
        garage=request.form.get("ng")

        #remplisage des donnees saisies
        data={
            u'Login': login,
            u'psw': psw,
            u'livingroom':livingroom,
            u'bednum':bednum,
            u'kitchen':kitchen,
            u'stairs':stairs,
            u'garage':garage,
            u'propriete': u'admin'
        }
        #verif de l'existant
        doc=db.collection(u'users').document(login)
        doc=doc.get()
        if doc.exists:
            H.msg="login deja existant"
            return redirect(f_end+'console')
            
        #ajout dans la base de donnee
        else:
            H.msg="succes"
            db.collection(u'users').document(login).set(data)
            return redirect(f_end+'console')
           
    else:
        return {"msg":H.msg}

    


#********************************************* Recuperation de tous les admin et l'affichage | Firebase *******************************************************
@app.route('/Dash/recupp')
def recup():
    login=[]
    livingroom=[]
    bednum=[]
    kitchen=[]
    stairs=[]
    garage=[]
    docs = db.collection(u'users').where(u'propriete', u'==', u'admin').stream()
    for doc in docs:
        if doc.exists:
            #recup of the admin's dets
            doc =doc.to_dict()
            login.append(doc["Login"])
            livingroom.append(doc["livingroom"])
            bednum.append(doc["bednum"])
            kitchen.append(doc["kitchen"])
            stairs.append(doc["stairs"])
            garage.append(doc["garage"])
    return {'login' : login, 'garage':garage,'livingroom':livingroom,'bednum':bednum,'kitchen':kitchen,'stairs':stairs}




#********************************************* Authentification FOR MOBILE DEVICE | Firebase *******************************************************

@app.route('/user/loginMobile', methods=['GET', 'POST'])
def loginMobile():
    #recuperer l'email et le mot de passe saisi par l'utilisateur
    if request.method == 'POST': 

        data = request.get_json()

        login = data["login"]
        psw = data['psw']

        doc_ref = db.collection(u'users').document(login)
        doc = doc_ref.get()
        #verif de si le nom d'utilisateur existe 
        if doc.exists:
            doc =doc.to_dict()
            passw=doc["psw"]
            nl=doc["livingroom"]
            nb=doc["bednum"]
            nk=doc["kitchen"]
            ns=doc["stairs"]
            nbrg=doc["garage"]

            H.nl=int(nl)
            H.nb=int(nb)
            H.nk=int(nk)
            H.ns=int(ns)
            
            if nbrg == "on":
                H.ng = 1
            else :
                H.ng = 0
                
            # verif du mdp
            if passw == psw :
                H=Home.Home()
                H.islogged=True
                return {"islogged":H.islogged}
            # connex reussie
            else:
                H.msg="Your login/password is incorrect"
                H.islogged=False
            #error
                return {"islogged":H.islogged}
    else:
        return {"msg":H.msg}
    




# # FIN DATABASE 

#**********************************************************************************************************************************
#**********************************************************************************************************************************
if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
