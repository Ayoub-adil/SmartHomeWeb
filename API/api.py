import flask
from flask import request,redirect, jsonify
import Home

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Firebase Config
cred = credentials.Certificate("./API/smart-h-firebase-adminsdk-q32wn-6d5614d56e (1).json")
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
    return "<h1>Home Simulator Server</h1>"+"<h2>You shouldn't be here.. </h2>"+"<h3>This is not a user space.. SORRY</h3>"

@app.route('/frontend')
def frontend(link=''):
    return redirect(f_end+link)

@app.route('/server')
def server():
    return {"server":True} 

@app.route('/session')
def session():
    return {"user":H.user,'type':H.userType} 

@app.route('/sessionMob')
def sessionMob():
    return {"usermob":H.usermob} 

@app.route('/sessionSA')
def sessionSA():
    return {"sessionSA":H.SAsession} 

@app.route('/connect')
def connect():
    return redirect(f_end+'SignIn')

@app.route('/disconnect')
def disconnect():
    H.user='User'
    H.userType='none'
    H.simulate(0,0,0,0,0)
    return "<h1>You are out of Home</h1>"

@app.route('/disconnectMob')
def disconnectMob():
    H.usermob='User'
    H.islogged =False
    H.simulate(0,0,0,0,0)
    return "<h1>You are out of Home</h1>"

@app.route('/disconnectSA')
def disconnectSA():
    H.SAsession=False
    return "<h1>You are out of Home</h1>"

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
@app.route('/change/rooom',methods=["POST","GET"])
def set_rooom():
    if request.method=='POST':
        data = request.get_json()
        rooom = data['rooom']
        typeOfRoom = data['typeofroom']
        H.setRoom(typeOfRoom, rooom)
        return "<h1>You shouldn't be here.. </h1>"
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
    H.msgSuper="pas de message"
    H.msg="pas de message"
    return {"msgSuper":H.msgSuper , "msg":H.msg}

@app.route('/SuperAdmin/loginDirecteur', methods=['GET', 'POST'])
def loginDirecteur():

# check if username and password exist in the form
    if request.method == 'POST': #and 'username' in request.form and 'password' in request.form:
        
        username = request.form.get("username")
        psw = request.form.get("password")
# verification
        if username == secretlogin and psw == secretpsw :
            H.SAsession=True
            return redirect(f_end+'console')
        # return 'Logged in successfully!'
        else:
            # message d'erreur
            H.msgSuper="Your login/password are incorrect, try again!"
            # H.msg = "err"
            return redirect(f_end+'login')
    else:
        return {"msgSuper":H.msgSuper}


# # DATABASE 

#********************************************** Authentification Users | FIREBASE ************************************************************


# SignIn users : 
@app.route('/user/login', methods=['GET', 'POST'])
def login():
    #recuperer l'email et le mot de passe saisi par l'utilisateur
    if request.method == 'POST': 
        login = request.form.get("log")
        psw = request.form.get("psw")
        
        doc_ref = db.collection(u'users').document(login)
        doc = doc_ref.get()
        #verif si le nom d'utilisateur existe 
        if doc.exists:
            doc =doc.to_dict()
            passw=doc["psw"]
            profil = doc["propriete"]
            H.userType = profil
            
            # verif si l'utilisateur est un ADMIN
            if profil == "admin" :
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
            # sinon si l'utilisateur est un USER
            else:
                owner = doc["owner"]
                if passw == psw :
                    H.user=login
                    doc_refe = db.collection(u'users').document(owner)
                    docu = doc_refe.get()
                    if docu.exists:
                        docu =docu.to_dict()
                        nl=int(docu["livingroom"])
                        nb=int(docu["bednum"])
                        nk=int(docu["kitchen"])
                        ns=int(docu["stairs"])
                        nbrg=docu["garage"]
                        if nbrg == "on":
                            ng = 1
                        else :
                            ng = 0
                        H.simulate(nl,nb,nk,ns,ng)
                        return redirect(f_end+'Home')
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


#********************************************* Authentification FOR MOBILE DEVICE | Firebase *******************************************************

@app.route('/user/loginMobile', methods=['GET', 'POST'])
def loginMobile():
    #recuperer l'email et le mot de passe saisi par l'utilisateur
    if request.method == 'POST': 
        H.islogged=False

        data = request.get_json()
        login = data['login']
        psw = data['psw']

        H.login=login
        H.psw=psw

        doc_ref = db.collection(u'users').document(login)
        doc = doc_ref.get()
        #verif de si le nom d'utilisateur existe 
        if doc.exists:
            doc =doc.to_dict()
            passw=doc["psw"]
            profil = doc["propriete"]
            # verif si l'utilisateur est un ADMIN
            if profil == "admin" :
                # verif du mdp
                if passw == psw :
                    H.islogged=True
                    H.msg="pas de message"
                    H.usermob = login
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
                else:
                    H.msg="Incorrect password"
            # sinon si l'utilisateur est un USER
            else:
                owner = doc["owner"]
                if passw == psw :
                    H.usermob=login
                    doc_refe = db.collection(u'users').document(owner)
                    docu = doc_refe.get()
                    if docu.exists:
                        docu =docu.to_dict()
                        H.islogged=True
                        H.msg="pas de message"
                        nl=int(docu["livingroom"])
                        nb=int(docu["bednum"])
                        nk=int(docu["kitchen"])
                        ns=int(docu["stairs"])
                        nbrg=docu["garage"]
                        if nbrg == "on":
                            ng = 1
                        else :
                            ng = 0
                        H.simulate(nl,nb,nk,ns,ng)
                else:
                    H.msg="Your Password is incorrect"
        else:
            #error
            H.msg="Inexistant account"
        return {"msg":H.msg,"islogged":H.islogged, "usermob":H.usermob}
    else:
        return {"msg":H.msg,"islogged":H.islogged, "usermob":H.usermob}  
    
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
        adress=request.form.get("adress")
        date=request.form.get("date")
        #remplisage des donnees saisies
        data={
            u'Login': login,
            u'psw': psw,
            u'adress':adress,
            u'date':date,
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
            H.msg="this Login is taken"
            return redirect(f_end+'console')
            
        #ajout dans la base de donnee
        else:
            H.msg="succes"
            db.collection(u'users').document(login).set(data)
            return redirect(f_end+'console')
           
    else:
        return {"msg":H.msg}

#****************************************************** form Add user (stockage) **************************************************************

@app.route('/UserForm', methods=['GET', 'POST'])
def AddUser():
    
    #recuperation du formulaire
    if request.method == 'POST':
        login=request.form.get("login")
        psw=request.form.get("psw")
        admin=H.user
        #remplisage des donnees saisies
        data={
            u'Login': login,
            u'psw': psw,
            u'propriete': u'user',
            u'owner':admin
        }
        #verif de l'existant
        doc=db.collection(u'users').document(login)
        doc=doc.get()
        if doc.exists:
            H.msgMember="this Login is taken"
            return redirect(f_end+'Profil')
            
        #ajout dans la base de donnee
        else:
            H.msgMember="You just Added a new user to your application"
            db.collection(u'users').document(login).set(data)
            return redirect(f_end+'Profil')
           
    else:
        return {"msgMember":H.msgMember}
#****************************************************** form Add user (stockage) MOBILE **************************************************************

@app.route('/UserFormMobile', methods=['GET', 'POST'])
def AddUserMobile():
    
    #recuperation du formulaire
    if request.method == 'POST':
        dataform = request.get_json()
        login = dataform['login']
        psw = dataform['psw']

        H.login=login
        H.psw=psw
        admin=H.usermob
        #remplisage des donnees saisies
        data={
            u'Login': login,
            u'psw': psw,
            u'propriete': u'user',
            u'owner':admin
        }
        #verif de l'existant
        doc=db.collection(u'users').document(login)
        doc=doc.get()
        if doc.exists:
            H.msgMemberMob="this Login is taken"
        #ajout dans la base de donnee
        else:
            H.msgMemberMob="You just Added a new user to your application"
            db.collection(u'users').document(login).set(data)
    else:
        return {"msgMemberMob":H.msgMemberMob}

#********************************************* Recuperation des users et l'affichage | Firebase *******************************************************
@app.route('/users/tab')
def getUsers():
    login=[]
    psw=[]
    ad=H.user
    
    docs= db.collection(u'users').where(u'propriete',u'==',u'user').where(u'owner',u'==',ad).stream()
    for doc in docs:
        if doc.exists:
            doc=doc.to_dict()
            login.append(doc["Login"])
            psw.append(doc["psw"])
    return{'login':login, 'psw':psw}
#********************************************* Suppression d'un utilisateur | Firebase ****************************************************************
@app.route('/users/supp',methods=['GET', 'POST'])
def delUser():
    if request.method == 'POST':
        data = request.get_json()
        login = data['login']
        db.collection(u'users').document(login).delete()
        H.DelMember="user deleted successfully"
        
    return{"DelMember":H.DelMember}
    
    



#********************************************* Recuperation de tous les admin et l'affichage | Firebase *******************************************************

@app.route('/Dash/recupp')
def recup():
    login=[]
    livingroom=[]
    bednum=[]
    kitchen=[]
    stairs=[]
    garage=[]
    adr=[]
    date=[]
    docs = db.collection(u'users').where(u'propriete', u'==', u'admin').stream()
    for doc in docs:
        if doc.exists:
            #recup of the admin's dets
            doc =doc.to_dict()
            login.append(doc["Login"])
            adr.append(doc["adress"])
            date.append(doc["date"])
            livingroom.append(doc["livingroom"])
            bednum.append(doc["bednum"])
            kitchen.append(doc["kitchen"])
            stairs.append(doc["stairs"])
            garage.append(doc["garage"])
    return {'login' : login, 'adress':adr,'date':date,'garage':garage,'livingroom':livingroom,'bednum':bednum,'kitchen':kitchen,'stairs':stairs}


# # FIN DATABASE 

#**********************************************************************************************************************************
#**********************************************************************************************************************************
if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
